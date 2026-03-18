import paramiko
import time
import sys
import getpass

sys.stdout.reconfigure(encoding='utf-8')

host = input("Enter Server IP: ")
user = input("Enter Username (default: root): ") or "root"
password = getpass.getpass("Enter Password: ")

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    print("Connecting to server...")
    client.connect(host, username=user, password=password)
    print("Connected.")
    
    # Check what is listening on port 80 using ss (since netstat is missing)
    cmd = "ss -tulnp | grep ':80 ' || echo 'Nothing on 80'"
    print(f"Executing: {cmd}")
    stdin, stdout, stderr = client.exec_command(cmd)
    
    print(stdout.read().decode('utf-8', errors='replace'))
    print(stderr.read().decode('utf-8', errors='replace'))

    # Check for nginx or apache
    cmd = "which nginx || which apache2 || which httpd || echo 'No common web server found'"
    print(f"Executing: {cmd}")
    stdin, stdout, stderr = client.exec_command(cmd)
    
    print(stdout.read().decode('utf-8', errors='replace'))
    print(stderr.read().decode('utf-8', errors='replace'))

finally:
    client.close()
