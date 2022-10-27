import sys
import os
import base64
import json
from google.oauth2 import service_account
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import DateRange
# from google.analytics.data_v1beta.types import Dimension
from google.analytics.data_v1beta.types import Metric
from google.analytics.data_v1beta.types import RunReportRequest


def sample_run_report(credentials, property_id):
    """Runs a simple report on a Google Analytics 4 property."""
    client = BetaAnalyticsDataClient(credentials=credentials)

    request = RunReportRequest(
        property=f"properties/{property_id}",
        # dimensions=[Dimension(name="date")],
        metrics=[Metric(name="activeUsers"), Metric(name="screenPageViews")],
        date_ranges=[DateRange(start_date="30daysAgo", end_date="yesterday")],
    )
    response = client.run_report(request)

    for row in response.rows:
        activeUsers = row.metric_values[0].value
        pageVies = row.metric_values[1].value

    return activeUsers, pageVies
        

if __name__ == "__main__":
    
    property_id = os.getenv('GOOGLE_PROPERTY_ID')
    if property_id is None and len(sys.argv)>1:
        property_id = sys.argv[1]

    key_file_str = os.getenv('GOOGLE_CLIENT_SECRETS_BASE64')
    if key_file_str is None and len(sys.argv)>2:
        key_file_str = sys.argv[2]

    key_file = base64.b64decode(key_file_str)
    json_account_info = json.loads(key_file)

    credentials = service_account.Credentials.from_service_account_info(json_account_info)
    activeUser, pageViews = sample_run_report(credentials, property_id)

    print(activeUser, pageViews)

    with open("./src/components/Stats.astro", 'r+') as f:
        content = f.read()
        content = content.replace("STAT_ACTIVE_USERS", f"{int(activeUser):,}")
        content = content.replace("STAT_PAGEVIEWS", f"{int(pageViews):,}")
        f.seek(0)
        f.truncate()
        f.write(content)
