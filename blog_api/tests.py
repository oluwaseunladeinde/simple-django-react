from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from blog.models import Post, Category


class PostTests(APITestCase):

    def test_view_posts(self):
        url = reverse('blog_api:listcreate')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_post(self):
        self.test_category = Category.objects.create(name='django')
        self.test_user = User.objects.create(
            username='testuser', email='testuser@example.com', password='testpassword')
        test_data = {
            "title": 'test title',
            "author": 1,
            "excerpt": " new excerpt",
            "content": "new content, please wait"
        }
        url = reverse('blog_api:listcreate')
        response = self.client.post(url, test_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
