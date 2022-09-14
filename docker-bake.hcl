variable "platforms" {
  default = ["linux/arm64", "linux/arm/v7", "linux/arm/v6"]
}

group "default" {
  targets = [
    "api",
    "client",
    "proxy"
  ]
  
}

target "client" {
  dockerfile = "Dockerfile"
  tags = ["syeddev/tb-client:latest"]
  platforms = platforms
  context = "./client"
}
target "api" {
  dockerfile = "Dockerfile"
  tags = ["syeddev/tb-server:latest"]
  platforms = platforms
  context = "./server"
}
target "proxy" {
  dockerfile = "Dockerfile"
  tags = ["syeddev/tb-proxy:latest"]
  platforms = platforms
  context = "./nginx"
}