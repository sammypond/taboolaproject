var aPi = 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init';

document.addEventListener('DOMContentLoaded', function (e){
	fetch(aPi)
		.then( function (results){
			return results.json();
		})
		.then( function (json){
			res = json.list;
			console.log(res);
			res.forEach(list => {
				const imgUrl = list.thumbnail[0].url;
				const category = list.categories[0];
				const { branding, url } = list;
				let { name } = list;
				if (name.length > 75) {
					name = name.substring(0, 75) + "...";
				}
			
				document.getElementById(
					"content-table"
				).innerHTML += `<div class="content-card">
					<div class="image">
						<a href=${url}><img class="card-image" src=${imgUrl}></a>
					</div>
					<a href=${url}><h2 class="card-title">${name}</h2></a>
					<a href=${url}><p class="card-branding">${branding}</p></a>
					</div>`;
			});
		})
})

fetch("https://ipinfo.io/json")
	.then ( function (response){
		return response.json();
	})
	.then (function (data){
		console.log("data", data.country);
		const userCountry = data.country;
		if (userCountry !== "US") {
			document.getElementById("title-text").innerHTML =
				"<h2>User Out of US</h2>";
		}
	})
	.catch(err => {
		console.log(err);
	});


