// we create here handler in this file basically handler are node js ////amazon  serverless function under the hoods its the amazon lambda
exports.handler=async(event ,context)=>{
    console.log(event)
    return {
        statusCode:200,
        body:'hello',
    }
}