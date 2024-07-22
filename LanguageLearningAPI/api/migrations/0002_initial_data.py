from django.db import migrations, transaction

def createInitialData(apps, schema_editor):
    Role = apps.get_model('api', 'Role')
    User = apps.get_model('api', 'User')
    Category = apps.get_model('api', 'Category')

    try:
        with transaction.atomic():
            # Create roles
            admin = Role.objects.create(name='Administrator')
            print(f"Created role: {admin}")
            moderator = Role.objects.create(name='Moderator')
            print(f"Created role: {moderator}")
            user = Role.objects.create(name='User')
            print(f"Created role: {user}")

            # Create users
            User.objects.bulk_create([
                User(
                    full_name='Admin User',
                    username='admin',
                    email='admin@email.com',
                    password='5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',  # Encrypted password: 12345
                    birth_date='2024-01-01',
                    country='United States',
                    active=True,
                    role=admin
                ),
                User(
                    full_name='Moderator User',
                    username='moderator',
                    email='moderator@email.com',
                    password='5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',  # Encrypted password: 12345
                    birth_date='2024-01-01',
                    country='United States',
                    active=True,
                    role=moderator
                ),
                User(
                    full_name='Common User',
                    username='user',
                    email='user@email.com',
                    password='5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',  # Encrypted password: 12345
                    birth_date='2024-01-01',
                    country='United States',
                    active=True,
                    role=user
                ),
            ])
            print("Users created successfully.")

            # Create Categories
            Category.objects.bulk_create([
                Category(name='Action'),
                Category(name='Adventure'),
                Category(name='Science Fiction'),
                Category(name='Fantasy'),
                Category(name='General Fiction'),
                Category(name='Historical Fiction'),
                Category(name='Short Story'),
                Category(name='Comedy'),
                Category(name='Suspense'),
                Category(name='Non-fiction'),
                Category(name='Philosophy'),
                Category(name='Current Affairs'),
            ])
            print("Categories created successfully.")

    except Exception as e:
        print(f"Error occurred while creating initial data: {e}")

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(createInitialData),
    ]
