from rest_framework import serializers
# from dj_rest_auth.serializers import UserDetailsSerializer
from .models import Test

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
UserModel = get_user_model()

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'  # Or specify the fields you want to include in your API.


class JWTSerializer(serializers.Serializer):
    """
    Serializer for JWT authentication.
    """
    access = serializers.CharField()
    refresh = serializers.CharField()
    user = serializers.SerializerMethodField()
    
    def get_user(self, obj):
        """
        Required to allow using custom USER_DETAILS_SERIALIZER in
        JWTSerializer. Defining it here to avoid circular imports
        """
        JWTUserDetailsSerializer = UserDetailsSerializer
        user_data = JWTUserDetailsSerializer(obj['user'], context=self.context).data
        return user_data

class UserDetailsSerializer(serializers.ModelSerializer):
    """
    User model w/o password
    """
    groups = serializers.SlugRelatedField(
        many=True,
        # read_only=True,
        slug_field='name',
        queryset=Group.objects.all()
    )

    @staticmethod
    def validate_username(username):
        if 'allauth.account' not in settings.INSTALLED_APPS:
            # We don't need to call the all-auth
            # username validator unless its installed
            return username

        from allauth.account.adapter import get_adapter
        username = get_adapter().clean_username(username)
        return username

    class Meta:
        extra_fields = []
        # see https://github.com/iMerica/dj-rest-auth/issues/181
        # UserModel.XYZ causing attribute error while importing other
        # classes from `serializers.py`. So, we need to check whether the auth model has
        # the attribute or not
        if hasattr(UserModel, 'USERNAME_FIELD'):
            extra_fields.append(UserModel.USERNAME_FIELD)
        if hasattr(UserModel, 'EMAIL_FIELD'):
            extra_fields.append(UserModel.EMAIL_FIELD)
        if hasattr(UserModel, 'first_name'):
            extra_fields.append('first_name')
        if hasattr(UserModel, 'last_name'):
            extra_fields.append('last_name')
        
        model = UserModel
        fields = ('pk', *extra_fields) + ('groups',)
        read_only_fields = ('email',)

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView

# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         print("HERE")
#         print(token)
#         # Add custom claims
#         token['username'] = user.username
#         token['email'] = "test"
#         token['first_name'] = 'NEW FIRST NAME'
#         # token['groups'] = [group.name for group in user.groups.all()]
#         # token['user'] = {
#         #     pk: 7,
#         #     username: 'jdonaldson1719@gmail.com',
#         #     email: 'jdonaldson1719@gmail.com',
#         #     first_name: '',
#         #     last_name: ''
#         # }
        
#         # token['access_token']
#         return token

# class CustomTokenObtainPairView(TokenObtainPairView):
#     serializer_class = CustomTokenObtainPairSerializer