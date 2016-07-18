#!/usr/bin/python
import cgi
import os
import sys
sys.stderr = sys.stdout # Make sure we can see any errors

try:
  # Read the id from the JSON and use as the filename:
  fs = cgi.FieldStorage()
  if not os.path.exists("conditions"):
    os.makedirs("conditions")
    
  saveFile = open("conditions/participants.txt", "w")
  
  # Now read the field curData, which we will assume is a string
  # and print it to this file:
  saveFile.write(fs["curData"].value)
  
  # Close the file and tell jQuery all went well:
  saveFile.close()
  print "Status: 200 OK"
  print "Content-type: text/plain"
  print
  print fs["id"].value + " saved"
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
