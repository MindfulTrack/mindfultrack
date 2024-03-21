import os
from .models import *
from django.core import signing
from django.conf import settings
from botocore.session import Session
from django.shortcuts import redirect
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.http import JsonResponse, HttpResponse

class MessageSender:
    # On creation of MessageSender Object save the send method and number/email
    def __init__(self, sendTo, sendType):
        self.sendTo = sendTo
        self.sendType = sendType

    # method to send emails.
    def send_email(
        self,
        message,
        subject,
        presigned_url_yes=None,
        presigned_url_no=None,
        # attachment=None,
        # attachment_name=None,
    ):
        try:
            toEmail = self.sendTo

            # EMAIL TEMPLATE GENERATED
            html_message = render_to_string(
                "email-template.html",
                {
                    "header": subject,
                    "message": message,
                    "link1": presigned_url_yes,
                    "link2": presigned_url_no,
                    # "customer": self,
                },
            )
            email = EmailMessage(
                "MindfulTrack " + subject,
                html_message,
                '"MindfulTrack" <mindfultrack@mindfultrack.org>',
                [toEmail],
            )
            email.content_subtype = "html"

            # ## IF ATTACHMENT
            # if attachment and attachment_name:
            #     email.attach(attachment_name, attachment, "application/pdf")
            email.send()

            return True
        except Exception as e:  ## EMAIL FAILED TO SEND
            print(e)
            return False

    def send_sms(self, message, subject, presigned_url_yes=None, presigned_url_no=None):
        sms_content = (
            f"{message} \n YES:\n {presigned_url_yes} \n NO: \n {presigned_url_no}" if presigned_url_yes else message
        )

        # SMS sending logic using the AWS SDK or another SMS gateway
        phone_number = "+1" + self.sendTo
        session = Session(profile="JacobMindfulTrack")

        client = session.create_client(
            "sns",
            region_name=settings.AWS_REGION,
            # aws_access_key_id=os.environ.get('AWS_ACCESS_KEY'),
            # aws_secret_access_key=os.environ.get('AWS_SECRET_KEY')
        )

        response = client.publish(
            PhoneNumber=phone_number,
            Message="MindfulTrack " + subject + " " + sms_content,
        )
        return response["MessageId"]

    ## METHOD TO SEND EMAIL OR TEXT BASED ON CUSTOMER PREFERENCE
    def send_message(self, **kwargs):
        
        if self.sendType == "TEXT":
            self.send_sms(
                **{
                    k: v
                    for k, v in kwargs.items()
                    if k in self.send_sms.__code__.co_varnames
                }
            )
        else:  ##EMAIL IF NO PREFERRED CONTACT
            self.send_email(
                **{
                    k: v
                    for k, v in kwargs.items()
                    if k in self.send_email.__code__.co_varnames
                }
            )
        # More message types can be added

## SIGNING 

def generate_signature(signValue):
    signer = signing.TimestampSigner()
    value = signer.sign_object(signValue)
    return value


def sendSignedUrl(signature):
    
    ## signature format
    # signature = {
    #     "user_id" : student[3],
    #     "matchedTimes" : availMatch
    # }
    user = Person.objects.filter(person_id=signature["user_id"]).first()
    signature['status'] = "ACCEPT"
    signatureYes = signature
    signatureYes = generate_signature(signatureYes)
    
    signature['status'] = "DECLINE"
    signatureNo = signature
    signatureNo = generate_signature(signatureNo)

    ## REMOVE IN PRODUCTION
    if(user.contact_preference == "TEXT"):
        sendTo = '4357735942'
    else:
        sendTo = 'jwdonaldson99@gmail.com'
    ## REMOVE IN PRODUCTION

    sender = MessageSender(sendTo, user.contact_preference)
    sender.send_message(
        subject="Appointment Available!",
        message="The following time slot has become available. Select yes to reserve your spot. Select no to wait for next available slot.",
        presigned_url_yes=settings.BASE_API_URL+"base/confirmAppointmentUrl/"+signatureYes,
        presigned_url_no=settings.BASE_API_URL+"base/confirmAppointmentUrl/"+signatureNo,
    )
    sender = MessageSender('jwdonaldson99@gmail.com', "EMAIL")
    sender.send_message(
        subject="Appointment Available!",
        message="The following time slot has become available. Select yes to reserve your spot. Select no to wait for next available slot.",
        presigned_url_yes=settings.BASE_API_URL+"base/confirmAppointmentUrl/"+signatureYes,
        presigned_url_no=settings.BASE_API_URL+"base/confirmAppointmentUrl/"+signatureNo,
    )
    return


def confirmAppointmentUrl(request, signature):
    signer = signing.TimestampSigner()
    try:
        ## Signed url only valid for 24 hours
        signatureObject = signer.unsign_object(signature, max_age=86400)
        print(signatureObject)
        print(signatureObject['matchedTimes'])

        ## VERIFY THAT STUDENT HASN"T ALREADY ACCEPTED OR DECLINED

        ## If accept save student to calendar view
            ## REDIRECT TO FRONT END ACCEPTED SCREEN
        ## Else decline find way to note decline and start process again. 
            ## REDIRECT TO FRONT END DECLINE SCREEN
    except signing.BadSignature:
        print("Tampering detected!")
    return JsonResponse({"error" : "Tampering detected!"})