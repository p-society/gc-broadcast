# Get the private IP address excluding the loopback interface
$privateIp = (Get-NetIPAddress | Where-Object { $_.AddressFamily -eq 'IPv4' -and $_.IPAddress -ne '127.0.0.1' }).IPAddress

# Check if a private IP was found
if ($privateIp -eq $null) {
    Write-Host "Private IP not found!"
    exit 1
}

# Print the private IP (you can export it or use it in your docker-compose command)
Write-Host "Private IP: $privateIp"

# Run docker-compose with the private IP (you can set an environment variable or use it directly)
# Set environment variable (optional)
[System.Environment]::SetEnvironmentVariable("PRIVATE_IP", $privateIp, [System.EnvironmentVariableTarget]::User)

# You can now use this private IP in your docker-compose.yml file, e.g., by referencing the environment variable
# docker-compose up -d
