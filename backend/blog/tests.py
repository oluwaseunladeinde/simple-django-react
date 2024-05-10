from django.test import TestCase
from django.contrib.auth.models import User
from blog.models import Post, Category


class Test_Create_Post(TestCase):

    @classmethod
    def setUpTestData(cls):
        test_category = Category.objects.create(name='django')
        text_user = User.objects.create_user(
            username='testuser', password='testpassword')
        test_post = Post.objects.create(category_id=1, title='testpost', content='my new testpost',
                                        excerpt='my testpost', slug='test-post', author_id=1, status='published')

    def test_blog_content(self):
        post = Post.objects.get(id=1)
        category = Category.objects.get(id=1)
        author = f'{post.author}'
        title = f'{post.title}'
        content = f'{post.content}'
        excerpt = f'{post.excerpt}'
        status = f'{post.status}'
        self.assertEqual(author, 'testuser')
        self.assertEqual(title, 'testpost')
        self.assertEqual(content, 'my new testpost')
        self.assertEqual(excerpt, 'my testpost')
        self.assertEqual(status, 'published')
        self.assertEqual(str(post), 'testpost')
        self.assertEqual(str(category), 'django')
