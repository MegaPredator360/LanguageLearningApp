from django.db import migrations, transaction

def createInitialData(apps, schema_editor):
    # We define the models to nest
    Role = apps.get_model('api', 'Role')
    User = apps.get_model('api', 'User')

    # Nest the database with the roles
    admin = Role.objects.create(role_name = 'Administrator')
    moderator = Role.objects.create(role_name = 'Moderator')
    user = Role.objects.create(role_name = 'User')

    # Nest the database with the users
    User.objects.bulk_create([
        User(
            full_name = 'Admin User',
            username = 'admin',
            email = 'admin@email.com',
            
            # Encrypted password: 12345
            password = '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',
            birth_date = '2024-01-01',
            country = 'United States',
            id_role = admin
        ),
        User(
            full_name = 'Moderator User',
            username = 'moderator',
            email = 'moderator@email.com',

            # Encrypted password: 12345
            password = '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',
            birth_date = '2024-01-01',
            country = 'United States',
            id_role = moderator
        ),
        User(
            full_name = 'Common User',
            username = 'user',
            email = 'user@email.com',

            # Encrypted password: 12345
            password = '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',
            birth_date = '2024-01-01',
            country = 'United States',
            id_role = user
        ),
    ])

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(createInitialData),
    ]
