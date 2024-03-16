from django.core import signing
from django.template.loader import render_to_string
from django.http import JsonResponse, HttpResponse
from django.core.mail import EmailMessage


class MessageSender:
    # On creation of MessageSender Object save the customer, email, and phone
    def __init__(self, email):
        self.email = email
        # self.phone = phone

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
            toEmail = self.email

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
                "Mindfultrack " + subject,
                html_message,
                '"Mindfultrack" <mindfultrack@mindfultrack.org>',
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

    # def send_sms(self, message, subject, presigned_url=None):
    #     sms_content = (
    #         f"{message}\nDownload URL: {presigned_url}" if presigned_url else message
    #     )

    #     # SMS sending logic using the AWS SDK or another SMS gateway
    #     print(self.customer.phone())
    #     phone_number = "+1" + self.phone
    #     session = botocore.session.Session()

    #     client = session.create_client(
    #         "sns",
    #         region_name=settings.AWS_S3_REGION_NAME,
    #         aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    #         aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    #     )

    #     response = client.publish(
    #         PhoneNumber=phone_number,
    #         Message="Summerhays Music Orem " + subject + ": " + sms_content,
    #     )
    #     return response["MessageId"]

    # ## METHOD TO SEND EMAIL OR TEXT BASED ON CUSTOMER PREFERENCE
    # def send_message(self, **kwargs):
    #     try:
    #         message_type = 
    #     except:
    #         message_type = None

    #     if message_type == "TEXT":
    #         self.send_sms(
    #             **{
    #                 k: v
    #                 for k, v in kwargs.items()
    #                 if k in self.send_sms.__code__.co_varnames
    #             }
    #         )
    #     else:  ##EMAIL IF NO PREFERRED CONTACT
    #         self.send_email(
    #             **{
    #                 k: v
    #                 for k, v in kwargs.items()
    #                 if k in self.send_email.__code__.co_varnames
    #             }
    #         )
    #     # More message types can be added

# def generate_signature(signValue):
#     # Replace 'your-bucket-name' with your S3 bucket name
#     signer = signing.TimestampSigner()
#     value = signer.sing_object({'value': signValue})

#     return value


# def sendSignedUrl(request, signature):
#     signature = generate_signature(signature)
#     sender = MessageSender('jwdonaldson99@gmail.com')
#     sender.send_email(
#         subject="Test Signed url",
#         message="Try the action below to see if it works!",
#         presigned_url="https://mindfultrack.org:8000/base/testVerifyUrl/"+signature,
#     )

# def testVerifyUrl(request, signature):
#     signer = signing.TimestampSigner()
#     try:
#         signatureObject = signer.unsign_object(signature)
#         print(signatureObject)
#     except signing.BadSignature:
#         print("Tampering detected!")  