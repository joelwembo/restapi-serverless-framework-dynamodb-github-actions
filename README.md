# prodxcloud Serverless microservices - AWS Node.js Typescript

Serverless Framework template for zero-config TypeScript support.
@author : Joel Otepa Wembo
@website: www.joelwembo.com
@linkedin: https://www.linkedin.com/in/joelotepawembo/
@prodxcloud.io

# prodxcloud.io

Accelerate, Streamline, and Secure DevOps Processes
Out-of-the-Box Provisioning and Deployment 
Take the guesswork out of cloud infrastructure management with prodxcloud's automated provisioning and deployment capabilities.

The prodxcloud platform is your DevOps copilot, taking as input high-level application specifications and translating them into detailed and fully managed cloud configurations. With pre-programmed knowledge of over 50 cloud services, the platform automatically provisions your application incorporating best practices around security, observability, availability and compliance standards. The platform is accessed via web UI, Terraform Provider, or API.


## Features

## More References
https://aws.plainenglish.io/serverless-part-i-building-a-serverless-api-with-aws-lambda-and-dynamodb-using-typescript-dc432e9ddf52
https://github.com/mamezou-tech/serverless-example-typescript

# logs

✔ Service deployed to stack prodxcloud-multi-tenant-saas-slsf-dev (296s)

endpoints:
  GET - https://ggqcva4ns2.execute-api.ap-southeast-1.amazonaws.com/dev/post/{postId}
  POST - https://ggqcva4ns2.execute-api.ap-southeast-1.amazonaws.com/dev/post
  PUT - https://ggqcva4ns2.execute-api.ap-southeast-1.amazonaws.com/dev/post/{postId}
  DELETE - https://ggqcva4ns2.execute-api.ap-southeast-1.amazonaws.com/dev/post/{postId}
  GET - https://ggqcva4ns2.execute-api.ap-southeast-1.amazonaws.com/dev/posts
  POST - https://ggqcva4ns2.execute-api.ap-southeast-1.amazonaws.com/dev/product
  GET - https://ggqcva4ns2.execute-api.ap-southeast-1.amazonaws.com/dev/product/{id}
  PUT - https://ggqcva4ns2.execute-api.ap-southeast-1.amazonaws.com/dev/product/{id}
  DELETE - https://ggqcva4ns2.execute-api.ap-southeast-1.amazonaws.com/dev/product/{id}
  GET - https://ggqcva4ns2.execute-api.ap-southeast-1.amazonaws.com/dev/products
  GET - https://ggqcva4ns2.execute-api.ap-southeast-1.amazonaws.com/dev/load-data/test
  POST - https://ggqcva4ns2.execute-api.ap-southeast-1.amazonaws.com/dev/note
  DELETE - https://ggqcva4ns2.execute-api.ap-southeast-1.amazonaws.com/dev/note/{noteDate}
  GET - https://ggqcva4ns2.execute-api.ap-southeast-1.amazonaws.com/dev/note
  POST - https://ggqcva4ns2.execute-api.ap-southeast-1.amazonaws.com/dev/register
  POST - https://ggqcva4ns2.execute-api.ap-southeast-1.amazonaws.com/dev/login
functions:
  getPost: get-post (27 MB)                                                                                                                                                                                          
  createPost: create-post (27 MB)
  updatePost: update-post (27 MB)
  deletePost: delete-post (27 MB)
  getAllPosts: get-all-posts (27 MB)
  createProduct: prodxcloud-multi-tenant-saas-slsf-dev-createProduct (27 MB)
  getProduct: prodxcloud-multi-tenant-saas-slsf-dev-getProduct (27 MB)
  updateProduct: prodxcloud-multi-tenant-saas-slsf-dev-updateProduct (27 MB)
  deleteProduct: prodxcloud-multi-tenant-saas-slsf-dev-deleteProduct (27 MB)
  listProduct: prodxcloud-multi-tenant-saas-slsf-dev-listProduct (27 MB)
  TestAPIProject: prodxcloud-multi-tenant-saas-slsf-dev-TestAPIProject (27 MB)
  addNote: prodxcloud-multi-tenant-saas-slsf-dev-addNote (27 MB)
  deleteNote: prodxcloud-multi-tenant-saas-slsf-dev-deleteNote (27 MB)
  getAllNotes: prodxcloud-multi-tenant-saas-slsf-dev-getAllNotes (27 MB)
  registerUser: prodxcloud-multi-tenant-saas-slsf-dev-registerUser (27 MB)
  loginUser: prodxcloud-multi-tenant-saas-slsf-dev-loginUser (27 MB)

# serverless framework commands


serverless deploy
Options
--config or -c Name of your configuration file, if other than serverless.yml|.yaml|.js|.json.
--stage or -s The stage in your service that you want to deploy to.
--region or -r The region in that stage that you want to deploy to.
--package or -p path to a pre-packaged directory and skip packaging step.
--verbose Shows all stack events during deployment, and display any Stack Output.
--force Forces a deployment to take place.
--function or -f Invoke deploy function (see above). Convenience shortcut - cannot be used with --package.
--conceal Hides secrets from the output (e.g. API Gateway key values).
--aws-s3-accelerate Enables S3 Transfer Acceleration making uploading artifacts much faster. You can read more about it here. It requires additional s3:PutAccelerateConfiguration permissions. Note: When using Transfer Acceleration, additional data transfer charges may apply.
--no-aws-s3-accelerate Explicitly disables S3 Transfer Acceleration. It also requires additional s3:PutAccelerateConfiguration permissions.



serverless deploy