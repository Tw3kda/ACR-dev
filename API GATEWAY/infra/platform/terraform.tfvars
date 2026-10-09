# Orígenes que el gateway (api/) acepta por CORS. Tras cambiarlo:
#   node scripts/deploy.mjs --platform && node scripts/deploy.mjs --no-build
cors_allowed_origins = [
  "http://localhost:8081",                 # expo start --web
  "http://localhost:5173",                 # vite dev (web de consulta)
  "http://acr-consent-web-dev-755933694912.s3-website-us-east-1.amazonaws.com", # web dev en S3 (sin CloudFront, provisional)
  # La URL de CloudFront del entorno dev se agrega aquí cuando AWS verifique la cuenta.
]
