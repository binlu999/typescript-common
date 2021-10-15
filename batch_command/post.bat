curl --location --request POST 'localhost/ocsd/UNASSIGNED_DISPATCH' \
--header 'Content-Type: application/json' \
--data-raw '{
    "TRANSFERDATA": {
        "VERSION": "3",
        "ROUTEDATA": {
            "ROUTEORDERLIST": {
                "ROUTEORDER": {
                    "CUSTOMERORDERLIST": {
                        "CUSTOMERORDER": {
                            "OBJECTID": "CUSTOMERORDER#3823622774",
                            "SHORTDESC": "CUSTOMERORDER#3823622774",
                            "SITEOBJID": "SITE#7041",
                            "ADDITIONALCOMMENTS": "please call betty 361 578 6641 with eta. she saiddriver was there and left? thanks",
                            "CITY": "HOUSTON",
                            "CUSTOMERID": "110-0195046",
                            "HOUSENO": "1021",
                            "LASTDRIVER": "Jones,Carl",
                            "LINEOFBUSINESS": "O",
                            "LOADTYPEOBJID": "LOADTYPE#35",
                            "NAME1": "TANI RO 1",
                            "NAME2": "TANVEER",
                            "OPENEDBY": "TSHAIKH",
                            "PHONE": "7452121247",
                            "REGION": "TX",
                            "REQUESTEDBY": "TANI",
                            "ORDERSEQUENCE": "0",
                            "STREET": "MAIN ST",
                            "TICKETNO": "120424",
                            "ZIPCODE": "77002-6502",
                            "LONGITUDE": "-95.3647708849997",
                            "LATITUDE": "29.7563089680004",
                            "WASTETYPE": "ACID",
                            "GUARANTEE_TYPE": "NA",
                            "GUARANTEE_VALUE": "NA",
                            "GUARANTEE_DESCRIPTION": "NA",
                            "UNIQUEID": "000195855363016",
                            "TRANSFERSTATUS": "NULL",
                            "TANDEM": "O",
                            "PLANDATE": "2021-07-09T00:00:00Z",
                            "CUSTOMERSERVICELIST": {
                                "CUSTOMERSERVICE": {
                                    "OBJECTID": "CUSTOMERSERVICE#3752249318",
                                    "SHORTDESC": "000000001",
                                    "SITEOBJID": "SITE#7041",
                                    "QUANTITY": "1",
                                    "CUSTOMERORDEROBJID": "CUSTOMERORDER#3823622774",
                                    "DESCR": "20 YD ROLLOFF",
                                    "SPECIALDESCR": "20O-20O-SPC DESC",
                                    "SERVICECODE": "20O",
                                   "YARDS": "20",
                                    "SERVICEID": "000000001",
                                    "PARENTSERVICEID": "000000001",
                                    "MANDISPOSALSITE": "false",
                                    "SWAPPABLE": "true",
                                    "SERVICETYPE": "H",
                                    "CNTRCLASSCODE": "20O",
                                    "CNTRCLASSDESC": "20 YARD OPEN TOP"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "TRANSACTION_ID": "12836336",
    "SOURCE": "OCSD",
    "ACTION_NAME": "UNASSIGNED_DISPATCH",
    "SITE_ID": "S02881",
    "PRODUCTAREA": "O",
    "PARTITION_KEY": "3823622774",
    "batch": 1,
    "batch_size": 1
}'
