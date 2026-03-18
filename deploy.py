import paramiko
import time
import sys

import getpass

sys.stdout.reconfigure(encoding='utf-8')

print("--- ERPNext Theme Deployment ---")
host = input("Enter Server IP: ")
user = input("Enter Username (default: root): ") or "root"
password = getpass.getpass("Enter Password: ")

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

print("Connecting to server...")
client.connect(host, username=user, password=password)

print("Connected! Searching for frappe-bench/apps/role8_theme...")
stdin, stdout, stderr = client.exec_command("find / -type d -path '*/frappe-bench/apps/role8_theme' 2>/dev/null | head -n 1")
app_path = stdout.read().decode('utf-8').strip()

if not app_path:
    print("Could not find role8_theme in any frappe-bench directory.")
else:
    print(f"Found app at: {app_path}")
    bench_path = app_path.replace("/apps/role8_theme", "")
    print(f"Bench path: {bench_path}")
    
    # get owner of the bench directory
    stdin, stdout, stderr = client.exec_command(f"stat -c '%U' {bench_path}")
    owner = stdout.read().decode('utf-8').strip()
    print(f"Bench owner: {owner}")
    
    # form the deployment command. Run as the owner user.
    cmd = (
        f"su - {owner} -c '"
        f"cd {app_path} && "
        f"git remote add origin https://github.com/AhmedMahdiDev/role8_theme.git || git remote set-url origin https://github.com/AhmedMahdiDev/role8_theme.git ; "
        f"git fetch origin main && git reset --hard origin/main && "
        f"cd {bench_path} && "
        f"bench build --app role8_theme && bench clear-cache'"
    )
    print(f"Executing: {cmd}")
    
    stdin, stdout, stderr = client.exec_command(cmd)
    
    # print output
    while not stdout.channel.exit_status_ready():
        if stdout.channel.recv_ready():
            print(stdout.channel.recv(1024).decode('utf-8', errors='replace'), end="")
        if stderr.channel.recv_ready():
            print(stderr.channel.recv(1024).decode('utf-8', errors='replace'), end="")
        time.sleep(0.1)
        
    # print remaining
    print(stdout.read().decode('utf-8', errors='replace'))
    print(stderr.read().decode('utf-8', errors='replace'))
    
    status = stdout.channel.recv_exit_status()
    print(f"Command finished with status {status}")

client.close()
