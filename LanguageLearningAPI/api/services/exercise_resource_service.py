from api.models.exercise_resource import ExerciseResource
from api.serializers.exercise_resource_serializer import ExerciseResourceSerializer

class ExerciseResourceService:

    # Obtain the list of all exercise resources
    def list(self):

        try:

            # Obtain all exercise resources
            exerciseResources = ExerciseResource.objects.all()

            # We serialize the objects
            serializer = ExerciseResourceSerializer(exerciseResources, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a exercise resource
    def create(self, exerciseResource: dict):

        try:

            # Serialize the data
            serializer = ExerciseResourceSerializer(data = exerciseResource)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the resource of the exersice: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Update an exercise resource
    def update(self, exerciseResource: dict):

        try:

            # Retrieve the specific exercise resource
            exerciseResourceFound = ExerciseResource.objects.get(id = exerciseResource['id'])

            # Update de data
            serializer = ExerciseResourceSerializer(instance = exerciseResourceFound, data = exerciseResource)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the exercise resource: {errors}')

            return serializer.data

        # If the exercise resource to update doesn't exist
        except ExerciseResource.DoesNotExist:

                # Send an excepction
                raise ValueError('The exercise resource to update does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e

    # Delete a exercise resource
    def delete(self, exerciseResourceId: int) -> bool:

        try:

            # Retrieve the specific exercise resource
            exerciseResourceFound = ExerciseResource.objects.get(id = exerciseResourceId)

            # Delete the exercise resource
            exerciseResourceFound.delete()

            return True

        # If the exercise resource to delete doesn't exist
        except ExerciseResource.DoesNotExist:
                
                # Send an excepction
                raise ValueError('The exercise resource to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e
