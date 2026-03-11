from drivers.models import DriverProfile


def get_driver_contact(driver_id):

    try:

        driver = DriverProfile.objects.select_related("user").get(id=driver_id)

        return f"""
Driver Name: {driver.user.email}
Phone: {driver.user.phone}
License: {driver.license_number}
Rating: {driver.rating}
"""
    except DriverProfile.DoesNotExist:

        return "Driver not found."