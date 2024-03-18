from django.core import signing
from django.template.loader import render_to_string
from django.http import JsonResponse, HttpResponse
from django.core.mail import EmailMessage
from botocore.session import Session

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
        presigned_url=None,
        attachment=None,
        attachment_name=None,
    ):
        try:
            toEmail = self.sendTo

            # EMAIL TEMPLATE GENERATED
            html_message = render_to_string(
                "email-template.html",
                {
                    "header": subject,
                    "message": message,
                    "link": presigned_url,
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

            ## IF ATTACHMENT
            if attachment and attachment_name:
                email.attach(attachment_name, attachment, "application/pdf")
            email.send()

            return True
        except Exception as e:  ## EMAIL FAILED TO SEND
            print(e)
            return False

    def send_sms(self, message, subject, presigned_url=None):
        sms_content = (
            f"{message}\n: {presigned_url}" if presigned_url else message
        )

        # SMS sending logic using the AWS SDK or another SMS gateway
        phone_number = "+1" + self.sendTo
        session = Session()

        client = session.create_client(
            "sns",
            region_name=settings.AWS_REGION,
            # aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            # aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        )

        response = client.publish(
            PhoneNumber=phone_number,
            Message="MindfulTrack " + subject + ": " + sms_content,
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

from django.core import signing
def generate_signature(signValue):
    # Replace 'your-bucket-name' with your S3 bucket name
    signer = signing.TimestampSigner()
    value = signer.sign_object({'value': signValue})
    print(value)
    return value


def sendSignedUrl(request, signature):
    signature = generate_signature(signature)
    sender = MessageSender('4357735942', "TEXT")
    sender.send_message(
        subject="Test Signed url",
        message="Try the action below to see if it works!",
        presigned_url="http://localhost:8000/api/base/testVerifyUrl/"+signature,
    )
    sender = MessageSender('jwdonaldson99@gmail.com', "EMAIL")
    sender.send_message(
        subject="Test Signed url",
        message="Try the action below to see if it works!",
        presigned_url="http://localhost:8000/api/base/testVerifyUrl/"+signature,
    )
    return JsonResponse({})


def testVerifyUrl(request, signature):
    signer = signing.TimestampSigner()
    try:
        ## Signed url only valid for 24 hours
        signatureObject = signer.unsign_object(signature, max_age=86400)
        print(signatureObject)
    except signing.BadSignature:
        print("Tampering detected!")
    return JsonResponse({})