import { DDBUtil } from './ddb/aws-ddb';

import { ro_191353576 } from './ddb/data/ro_data';

const TABLE_NAME = 'ocs-routeorder-rolloff-poc';
const ddbUtil = new DDBUtil();

async function testROs() {
    //Put RO ROUTEORDER#191353576
    await ddbUtil.putItem({
        TableName: TABLE_NAME,
        Item: ro_191353576
    });

    //Get RO ROUTEORDER#191353576 by key
    const OBJECTID = 'OBJECTID';
    await ddbUtil.getItem({
        TableName: TABLE_NAME,
        Key: {
            [OBJECTID]: 'ROUTEORDER#191353576'
        }
    });

    //Get ROs by date
    console.log("Get ROs by date");
    await ddbUtil.getItems({
        TableName: TABLE_NAME,
        IndexName: 'DATEPLANNED-SITE_ID-index',
        KeyConditionExpression: ' DATEPLANNED = :key_value',
        ExpressionAttributeValues: {
            ':key_value': '2022-09-13T00:00:00Z'
        }
    })

    //Get ROs by date and site ID
    console.log("Get ROs by date and site ID");
    await ddbUtil.getItems({
        TableName: TABLE_NAME,
        IndexName: 'DATEPLANNED-SITE_ID-index',
        KeyConditionExpression: ' DATEPLANNED = :key_value and SITE_ID = :key_value_1',
        ExpressionAttributeValues: {
            ':key_value': '2022-09-13T00:00:00Z',
            ':key_value_1': 'S02935'
        }
    })

    
}

testROs();
