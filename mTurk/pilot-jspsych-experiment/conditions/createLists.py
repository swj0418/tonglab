#!/usr/bin/python
import json
import os
import sys
import time
from datetime import datetime
sys.stderr = sys.stdout # Make sure we can see any errors

try:
  # Create empty list and write JSON to file:
  listNum = 300
  status = [0] * listNum
  with open("/var/www/html/TongLab/mTurk/pilot-jspsych-experiment/conditions/status.txt", "w") as sFile:
    json.dump(status, sFile)
  
  # Close the file and tell jQuery all went well:
  sFile.close()

  # Create list with ['p', 't'] and write JSON to file:
  participants = [[0, 0]] * listNum
  with open("/var/www/html/TongLab/mTurk/pilot-jspsych-experiment/conditions/participants.txt", "w") as pFile:
    json.dump(participants, pFile)
  
  # Close the file and tell jQuery all went well:
  pFile.close()
  print "Status: 200 OK"
  print "Content-type: text/plain"
  print
  print "status.txt and participants.txt created or reset"
except:

  # Tell jQuery something went wrong
  print "Status: 400 Bad Request"
  print "Content-type: text/plain"
  print
  print "Error"

  # Utilize participants.txt for returning users (refresh or otherwise) to deny
  # completion and ask for return

  # Create status.txt and participants.txt for JSON format
  # status.txt with be formed with [e] * n with e = 0 and n = number of
  # participants
  # participants.txt will be formed with [['p','t']] * n

  # Read status.txt into list
  # Check participants.txt (containing ID's and times accepted)
  # If there are times beyond the set expiration limit, find the associated ID 
  # (it may be okay to just have the index associated with file name 
  # rather than the ID itself) and adjust the status of the location back to 
  # "open"
