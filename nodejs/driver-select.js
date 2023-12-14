const { ZBClient } = require('zeebe-node')

const zbc = new ZBClient({
	camundaCloud: {
		clusterId: 'a26cb4a6-e0c0-40b1-ae07-fe15ea1baf5c',
		clientId: 'LYLoNjv4TOfTXTT2ihTfqcLTR-mEimdP',
		clientSecret: 'iCVJPn3LcX3iSBmT7Jr6KYZoUhTHSe3s8ywoKVfrU5.Bxusfwq.9DIb4p8Xdoudg',
	},
})


function getUberDriverName(inputString) {
	const driverNames = [
	  "Alex",
	  "Emma",
	  "Max",
	  "Olivia",
	  "Sophia",
	  "Liam",
	  "Lucas",
	  "Umut",
	  "Jonas"
	];
  
	if (inputString.length > 6) {
	  // If the input string is longer than 6 characters, return a different random name
	  const filteredNames = driverNames.filter(name => name !== inputString);
	  const randomName = filteredNames[Math.floor(Math.random() * filteredNames.length)];
	  return randomName;
	} else if (inputString.length > 3) {
	  // If the input string is longer than 4 characters but not longer than 6, return a random name
	  const randomName = driverNames[Math.floor(Math.random() * driverNames.length)];
	  return randomName;
	} else {
	  // If the input string is 4 characters or shorter, return an informative message
	  return "";
	}
  }

const workerDestination = zbc.createWorker({
	taskType: 'destination_select',
	taskHandler: (job) => {
		workerDestination.log(`Sending email with message content: ${job.variables}`)
	
		job.complete()
	}
})

const worker = zbc.createWorker({
	taskType: 'choose_driver',
	taskHandler: (job) => {
		worker.log(`Sending email with message content: ${JSON.stringify(job.variables)}`)
		driverName = getUberDriverName(job.variables["destination"])
		job.complete({
			driver_name: driverName,
		  });	}
})
