# Role8 Theme

ERPNext theme using Role8 brand identity.

## Installation

### 1. Manual Installation
If you have SSH access to your server and are inside the `frappe-bench` directory, run the following commands:

```bash
# Download the app
bench get-app https://github.com/AhmedMahdiDev/role8_theme

# Install the app on your site
bench --site [site-name] install-app role8_theme
```

### 2. Automated Deployment (From Local Machine)
If you want to deploy the theme directly to your server without manually running bench commands, you can use the provided Python deployment script.

**Prerequisites:**
You need `paramiko` installed on your local machine:
```bash
pip install paramiko
```

**Usage:**
Run the deployment script from the theme directory:
```bash
python deploy.py
```
*The script will prompt you for your Server IP, Username, and Password securely to complete the deployment automatically.*

**Other Tools:**
- `setup_redirect.py`: Configures Nginx redirect for port 80.
- `check_server.py`: Checks server and port configurations.

## License

MIT
