import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')



client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    print("Connecting to server...")
    client.connect(host, username=user, password=password)
    print("Connected.")
    
    # 1. Check current nginx configs to see if there's a default server block for port 80
    cmd = "cat /etc/nginx/sites-enabled/* | grep -i 'listen.*80' || echo 'No active port 80 sites'"
    print(f"Executing: {cmd}")
    stdin, stdout, stderr = client.exec_command(cmd)
    output = stdout.read().decode('utf-8', errors='replace').strip()
    print("Active Port 80 blocks:")
    print(output)
    print("-" * 40)
    
    # Check if there is already a top-level redirect or default conf
    cmd = "ls /etc/nginx/conf.d/ /etc/nginx/sites-enabled/"
    stdin, stdout, stderr = client.exec_command(cmd)
    print("Config files:")
    print(stdout.read().decode('utf-8', errors='replace'))
    
    # We will create a new config file in conf.d to handle the redirect for the base IP
    nginx_conf = """
server {
    listen 80;
    server_name 161.97.67.194;
    
    # Redirect root to app/home on port 8080
    location = / {
        return 301 http://161.97.67.194:8080/app/home;
    }
}
"""
    # Write the config to the server
    cmd = f"cat << 'EOF' > /etc/nginx/conf.d/erpnext_redirect.conf\n{nginx_conf}\nEOF"
    print(f"Executing: Write config to /etc/nginx/conf.d/erpnext_redirect.conf")
    client.exec_command(cmd)
    
    # Test and reload
    cmd = "nginx -t && systemctl reload nginx"
    print(f"Executing: {cmd}")
    stdin, stdout, stderr = client.exec_command(cmd)
    print(stdout.read().decode('utf-8', errors='replace'))
    print(stderr.read().decode('utf-8', errors='replace'))

finally:
    client.close()
