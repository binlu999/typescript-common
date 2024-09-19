import { OCSDataType } from './model';
import * as aws from 'aws-sdk';
import { GetItemInput, PutItemInput, PutItemOutput } from 'aws-sdk/clients/dynamodb';

aws.config.update({
    region:'us-east-1'
});

const ddbClient=new aws.DynamoDB.DocumentClient();

export class DDBUtil {
    constructor(){

    }

    public async putItem(params:PutItemInput){
        const response=await ddbClient.put(params).promise();

        console.log(JSON.stringify(response));
    }

    public async getItem(params:any){
        const response = await ddbClient.get(
            params
        ).promise();

        console.log(JSON.stringify(response));
    }

    public async getItems(params:any){
        const response = await ddbClient.query(
            params
        ).promise();

        console.log(JSON.stringify(response));
    }
    
}