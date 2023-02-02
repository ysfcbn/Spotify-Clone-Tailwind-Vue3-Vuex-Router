'use strict';

import axios from 'axios';
import { Buffer } from 'buffer';
import qs from 'qs';

// export const getAuth = async () => {
// 	const encodedID = Buffer.from(
// 		'975fd3eb76424ac49bd2a701a015fc89' +
// 			':' +
// 			'ef942e778f7a4bdbb4aedb682574fea0'
// 	).toString('base64');
// 	const headers = {
// 		Accept: 'application/json',
// 		'Content-Type': 'application/x-www-form-urlencoded',
// 		Authorization: 'Basic ' + encodedID,
// 	};
// 	const data = {
// 		grant_type: 'client_credentials',
// 	};

// 	try {
// 		const response = await axios.post(
// 			'https://accounts.spotify.com/api/token',
// 			qs.stringify(data),
// 			headers
// 		);
// 		console.log(response.data.access_token);
// 		return response.data.access_token;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// ('975fd3eb76424ac49bd2a701a015fc89');
// ('ef942e778f7a4bdbb4aedb682574fea0');
// ('Basic OTc1ZmQzZWI3NjQyNGFjNDliZDJhNzAxYTAxNWZjODk6ZWY5NDJlNzc4ZjdhNGJkYmI0YWVkYjY4MjU3NGZlYTA=');
// OTc1ZmQzZWI3NjQyNGFjNDliZDJhNzAxYTAxNWZjODk6ZWY5NDJlNzc4ZjdhNGJkYmI0YWVkYjY4MjU3NGZlYTA;
