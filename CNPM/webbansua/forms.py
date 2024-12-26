from django import forms
from .models import CustomUser  # Đảm bảo CustomUser đã được định nghĩa trong models.py
from webbansua.models import CustomUser  # Import mô hình người dùng mặc định



class LoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Tên đăng nhập'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Mật khẩu'}))

    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get("username")
        password = cleaned_data.get("password")

        # Bạn có thể thêm kiểm tra nếu cần, ví dụ kiểm tra độ dài tên đăng nhập hay mật khẩu
        if not username or not password:
            raise forms.ValidationError("Tên đăng nhập và mật khẩu không được để trống.")
        
        return cleaned_data
    



class RegistrationForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']

    # Nếu muốn yêu cầu người dùng nhập mật khẩu (như kiểu tối thiểu dài 6 ký tự), có thể thêm Validation
    def clean_password(self):
        password = self.cleaned_data.get('password')
        if len(password) < 6:
            raise forms.ValidationError("Mật khẩu phải có ít nhất 6 ký tự.")
        return password
    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])  # Mã hóa mật khẩu
        if commit:
            user.save()  # Lưu người dùng vào cơ sở dữ liệu
        return user
