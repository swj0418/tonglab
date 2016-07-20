#!/usr/bin/python
import json
import cgi
import os
import sys
import time
from datetime import datetime
sys.stderr = sys.stdout # Make sure we can see any errors

try:
  # expTime in hours
  expTime = 2
  expTimeSec = expTime * 3600
  
  now = datetime.now()
  nowSec = time.mktime(now.timetuple())

  # Open participants file to check time limit 
  pFile = open("participants.txt", "r")
  pString = pFile.read()
  pList = json.loads(pString)
  
  sFile = open("status.txt", "r")
  sString = sFile.read()
  sList = json.loads(sString)

  # Close the file and tell jQuery all went well:
  sFile.close()
  pFile.close()

  # Loop through list and check if over time
  for i, j in enumerate(pList):
    if (sList[i] == 1) and ((nowSec - j[1]) > expTimeSec):
      index = i
      # Update participant listings
      pList[index][0] = 0
      pList[index][1] = 0
      sList[index] = 0

  # Now write the updated list into JSON
  with open("participants.txt", "w") as pUpdate:
    json.dump(pList, pUpdate)
  with open("status.txt", "w") as sUpdate:
    json.dump(sList, sUpdate)
  
  # Close the file and tell jQuery all went well:
  pUpdate.close()
  sUpdate.close()

  print "Status: 200 OK"
  print "Content-type: text/plain"
  print
  print datetime.now().strftime('%Y-%m-%d %H:%M:%S') + " status.txt and participants.txt updated"
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
