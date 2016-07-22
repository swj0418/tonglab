#!/usr/bin/perl -l
use CGI qw(:standard);
use CGI::Carp qw(warningsToBrowser fatalsToBrowser);  # Make sure we can see any errors
use lib;
use JSON;

print header;
# Read the id
my $cgi = CGI->new;

# Parse out the three fields we know the experiments always send us,
# the id, the experimentName, and the data (curData). Save the data
# in a file called {id}.txt in folder {experimentName}.
my $id = $cgi->param('id');
my $experimentName = $cgi->param('experimentName');

if(!($id eq null) && $experimentName eq 'pilot') {
	my $repeat = 0;

	# Open participants file to check time limit 
	my $statusFile = '/var/www/html/TongLab/mTurk/pilot-jspsych-experiment/conditions/status.txt';
	my $partFile = '/var/www/html/TongLab/mTurk/pilot-jspsych-experiment/conditions/participants.txt';

	my $json_stext = do {
	   open(my $json_sf, "<:encoding(UTF-8)", $statusFile)
	      or die("Can't open \$statusFile\": $!\n");
	   local $/;
	   <$json_sf>
	};

	my @status = @{decode_json $json_stext};

	my $json_ptext = do {
	   open(my $json_pf, "<:encoding(UTF-8)", $partFile)
	      or die("Can't open \$partFile\": $!\n");
	   local $/;
	   <$json_pf>
	};

	my @participants = @{decode_json $json_ptext};

	foreach $slot (0..$#participants) {
	  if(@{@participants[$slot]}[0] eq $id) {
	  	$repeat = 1;
	  	last;
	  }
	}
	print $id;
	print @{@participants[$index]}[0];
	print $repeat;
	if(!$repeat) {
		$place;
		foreach $index (0..$#status) {
		  if($status[$index]==0) {
		  	$place = $index;
		  	$status[$place] = 1;
		  	last;
		  }
		}

		@{@participants[$place]}[0] = $id;
		@{@participants[$place]}[1] = time();

		my $json_str_status = encode_json \@status;
		my $json_str_participants = encode_json \@participants;

		open(my $SID, '>', $statusFile) 
			or die("Can't open \$statusFile\": $!\n");
		print $SID "$json_str_status";

		open(my $PID, '>', $partFile) 
			or die("Can't open \$partFile\": $!\n");
		print $PID "$json_str_participants";

		close(status);
		close(participants);
	}
}