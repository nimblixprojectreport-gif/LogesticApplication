def report_issue(issue):

    if issue == "package_damaged":
        return "We are sorry. Your damaged package complaint has been registered."

    elif issue == "driver_delay":
        return "Driver delay reported. Our team is checking."

    elif issue == "wrong_address":
        return "Please update your address in shipment details."

    return "Issue recorded."