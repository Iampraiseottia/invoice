//Drop down
var dropdown = document.querySelector('.dropdown');
var dropdownContent = document.querySelector('.dropdown-content');

dropdown.addEventListener('mouseover', function () {
    dropdownContent.style.display = 'block';
});

dropdown.addEventListener('mouseout', function () {
    dropdownContent.style.display = 'none';
});


//Animate Image
var image = document.getElementById("animate-image");
image.classList.add("animate");


//Client Images
var clientImage = document.getElementById("client-image");

clientImage.addEventListener("mouseover", function() {
    clientImage.style.filter = "brightness(100%)";
});

clientImage.addEventListener("mouseout", function() {
    clientImage.style.filter = "brightness(50%)";
});


//About Section Appear
document.addEventListener('DOMContentLoaded', function() {
    var aboutSection = document.querySelector('#About');
    
    var options = {
      threshold: 0.35 
    };
    
    var observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
        
      });
    }, options);
    
    observer.observe(aboutSection);
});


//Service Section Appear
document.addEventListener('DOMContentLoaded', function() {
  var serviceSection = document.querySelector('#services');
  
  var serviceOptions = {
    threshold: 0.19 
  };
  
  var serviceObserver = new IntersectionObserver(function(serviceEntries, observer) {
    serviceEntries.forEach(function(serviceEntry) {
      
      if (serviceEntry.isIntersecting) {
        serviceEntry.target.classList.add('serviceShow');
        observer.unobserve(serviceEntry.target);
      }
      
    });
  }, serviceOptions);
  
  serviceObserver.observe(serviceSection);
});


//Team Section Appear
document.addEventListener('DOMContentLoaded', function() {
  var teamSection = document.querySelector('#team');
  
  var teamOptions = {
    threshold: 0.19 
  };
  
  var teamObserver = new IntersectionObserver(function(teamEntries, observer) {
    teamEntries.forEach(function(teamEntry) {
      
      if (teamEntry.isIntersecting) {
        teamEntry.target.classList.add('teamShow');
        observer.unobserve(teamEntry.target);
      }
      
    });
  }, teamOptions);
  
  teamObserver.observe(teamSection);
});



//Testimony Section Appear
document.addEventListener('DOMContentLoaded', function() {
  var testimonySection = document.querySelector('#testimony');
  
  var testimonyOption = {
    threshold: 0.19 
  };
  
  var testimonyObserver = new IntersectionObserver(function(testimonyEntries, observer) {
    testimonyEntries.forEach(function(testimonyEntry) {
      
      if (testimonyEntry.isIntersecting) {
        testimonyEntry.target.classList.add('testimonyShow');
        observer.unobserve(testimonyEntry.target);
      }
      
    });
  }, testimonyOption);
  
  testimonyObserver.observe(testimonySection);
});

//SELECT COUNTRY
const name = document.getElementById('name');
const userName = document.getElementById('Username');
const email = document.getElementById('Email');
const password = document.getElementById('Password');
const form = document.getElementById('form');
const confirmPassword = document.getElementById('Confirm-password');
const country = document.getElementById('Country');


const countries = [
  { 
    name: 'Afghanistan',
   image: 'afghanistan.png' 
  },
  { 
    name: 'Albania',
   image: 'albania.png' 
  },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'American Samoa',
   image: 'American Samoa.png' 
  },
  { 
    name: 'Andorra',
   image: 'Andorra.png' 
  },
  { 
    name: 'Angola',
     image: 'Angola.png'
  },
  { 
    name: 'Anguilla',
   image: 'Anguilla.png' 
  },
  { 
    name: 'Antarctica',
   image: 'Antarctica.jpg' 
  },
  { 
    name: 'Antigua and Barbuda',
     image: 'Antigua and Barbuda.png'
  },
  { 
    name: 'Argentina',
   image: 'Argentina.png' 
  },
  { 
    name: 'Armenia',
   image: 'Armenia.png' 
  },
  { 
    name: 'Aruba',
     image: 'Aruba.png'
  },
  { 
    name: 'Australia',
   image: 'Australia.png' 
  },
  { 
    name: 'Austria',
   image: 'Austria.png' 
  },
  { 
    name: 'Azerbaijan',
     image: 'Azerbaijan.png'
  },
  { 
    name: 'Bahamas',
   image: 'Bahamas.png' 
  },
  { 
    name: 'Bahrain',
   image: 'Bahrain.png' 
  },
  { 
    name: 'Bangladesh',
     image: 'Bangladesh.png'
  },
  { 
    name: 'Barbados',
   image: 'Barbados.png' 
  },
  { 
    name: 'Belarus',
   image: 'Belarus.png' 
  },
  { 
    name: 'Belgium',
     image: 'Belgium.png'
  },
  { 
    name: 'Belize',
   image: 'Belize.png' 
  },
  { 
    name: 'Benin',
   image: 'Benin.png' 
  },
  { 
    name: 'Bermuda',
     image: 'Bermuda.png'
  },
  { 
    name: 'Bhutan',
   image: 'Bhutan.png' 
  },
  { 
    name: 'Bolivia',
   image: 'Bolivia.png' 
  },
  { 
    name: 'Bosnia and Herzegovina',
     image: 'Bosnia and Herzegovina.png'
  },
  { 
    name: 'Botswana',
   image: 'Botswana.png' 
  },
  { 
    name: 'Brazil',
   image: 'Brazil.png' 
  },
  { 
    name: 'Brunei Darussalam',
     image: 'Brunei Darussalam.png'
  },
  { 
    name: 'Bulgaria',
   image: 'Bulgaria.png' 
  },
  { 
    name: 'Burkina Faso',
   image: 'Burkina Faso.png' 
  },
  { 
    name: 'Burundi',
     image: 'Burundi.jpg'
  },
  { 
    name: 'Cambodia',
   image: 'Cambodia.png' 
  },
  { 
    name: 'Cameroon',
   image: 'Cameroon.png' 
  },
  { 
    name: 'Canada',
     image: 'Canada.png'
  },
  { 
    name: 'Cape Verde',
   image: 'Cape Verde.png' 
  },
  { 
    name: 'Cayman Islands',
   image: 'Cayman Islands.png' 
  },
  { 
    name: 'Central African Republic',
     image: 'Central African Republic.png'
  },
  { 
    name: 'Chad',
   image: 'Chad.png' 
  },
  { 
    name: 'Chile',
   image: 'Chile.png' 
  },
  { 
    name: 'China',
     image: 'China.png'
  },
  { 
    name: 'Christmas Island',
   image: 'Christmas Island.png' 
  },
  { 
    name: 'Cocos (Keeling) Islands',
   image: 'Cocos (Keeling) Islands.png' },
  { 
    name: 'Colombia',
     image: 'Colombia.png'
  },
  { 
    name: 'Comoros',
   image: 'Comoros.png' 
  },
  { 
    name: 'Democratic Republic of the Congo (Kinshasa)',
   image: 'Democratic Republic of the Congo (Kinshasa).png' 
  },
  { 
    name: 'Congo, Republic of (Brazzaville)',
     image: 'Congo, Republic of (Brazzaville).png'
  },
  { 
    name: 'Cook Islands',
   image: 'Cook Islands.png' 
  },
  { 
    name: 'Costa Rica',
   image: 'Costa Rica.png' 
  },
  { 
    name: `Côte D'ivoire (Ivory Coast)`,
     image: `Côte D'ivoire (Ivory Coast).jpg`
  },
  { 
    name: 'Croatia',
   image: 'Croatia.png' 
  },
  { 
    name: 'Cuba',
   image: 'Cuba.png' 
  },
  { 
    name: 'Cyprus',
     image: 'Cyprus.png'
  },
  { 
    name: 'Czech Republic',
   image: 'Czech Republic.png' 
  },
  { 
    name: 'Denmark',
   image: 'Denmark.png' 
  },
  { 
    name: 'Djibouti',
     image: 'Djibouti.png'
  },
  { 
    name: 'Dominica',
   image: 'Dominica.jpg' 
  },
  { 
    name: 'Dominican Republic',
   image: 'Dominican Republic.png' 
  },
  { 
    name: 'East Timor (Timor-Leste)',
     image: 'East Timor (Timor-Leste).jpg'
  },
  { 
    name: 'Ecuador',
   image: 'Ecuador.jpg' 
  },
  { 
    name: 'Egypt',
   image: 'Egypt.png' 
  },
  { 
    name: 'El Salvador',
     image: 'El Salvador.png'
  },
  { 
    name: 'Equatorial Guinea',
   image: 'Equatorial Guinea.jpg' 
  },
  { 
    name: 'Eritrea',
   image: 'Eritrea.png' 
  },
  { 
    name: 'Estonia',
     image: 'Estonia.png'
  },
  { 
    name: 'Ethiopia',
   image: 'Ethiopia.jpg' 
  },
  { 
    name: 'Falkland Islands',
   image: 'Falkland Islands.png' 
  },
  { 
    name: 'Faroe Islands',
     image: 'Faroe Islands.png'
  },
  { 
    name: 'Fiji',
   image: 'Fiji.png' 
  },
  { 
    name: 'Finland',
   image: 'Finland.png' 
  },
  { 
    name: 'France',
     image: 'France-flag.png'
  },
  { 
    name: 'Gabon',
   image: 'Gabon.png' 
  },
  { 
    name: 'Gambia',
   image: 'Gambia.png' 
  },
  { 
    name: 'Georgia',
     image: 'Georgia.png'
  },
  { 
    name: 'Germany',
   image: 'Germany-flag.png' 
  },
  { 
    name: 'Ghana',
   image: 'Ghana.png' 
  },
  { 
    name: 'Gibraltar',
     image: 'Gibraltar.png'
  },
  { 
    name: 'Greece',
   image: 'Greece.png' 
  },
  { 
    name: 'Greenland',
   image: 'Greenland.png' 
  },
  { 
    name: 'Grenada',
     image: 'Grenada.png'
  },
  { 
    name: 'Guadeloupe',
   image: 'Guadeloupe.jpg' 
  },
  { 
    name: 'Guam',
   image: 'Guam.png' 
  },
  { 
    name: 'Guinea',
     image: 'Guinea.png'
  },
  { 
    name: 'Guinea-Bissau',
   image: 'Guinea-Bissau.png' 
  },
  { 
    name: 'Guyana',
   image: 'Guyana.png' 
  },
  { 
    name: 'Haiti',
     image: 'Haiti.jpg'
  },
  { 
    name: 'Holy See',
   image: 'Holy See.jpg' 
  },
  { 
    name: 'Honduras',
   image: 'Honduras.png' 
  },
  { 
    name: 'Hong Kong',
     image: 'Hong Kong.png'
  },
  { 
    name: 'Hungary',
   image: 'Hungary.jpg' 
  },
  { 
    name: 'Iceland',
   image: 'Iceland.png' 
  },
  { 
    name: 'India',
     image: 'India.png'
  },
  { 
    name: 'Indonesia',
   image: 'Indonesia.png' 
  },
  { 
    name: 'Iran',
   image: 'Iran.jpg' 
  },
  { 
    name: 'Iraq',
     image: 'Iraq.png'
  },
  { 
    name: 'Ireland',
   image: 'Ireland.png' 
  },
  { 
    name: 'Israel',
   image: 'Israel.jpg' 
  },
  { 
    name: 'Italy',
     image: 'Italy-flag.png'
  },
  { 
    name: 'Jamaica',
   image: 'Jamaica.jpg' 
  },
  { 
    name: 'Japan',
   image: 'Japan.png' 
  },
  { 
    name: 'Jordan',
     image: 'Jordan.png'
  },
  { 
    name: 'Kazakhstan',
   image: 'Kazakhstan.jpg' 
  },
  { 
    name: 'Kenya',
   image: 'Kenya.png' 
  },
  { 
    name: 'Kiribati',
     image: 'Kiribati.png'
  },
  { 
    name: 'North Korea',
   image: 'North Korea.png' 
  },
  { 
    name: 'South Korea',
   image: 'South Korea.jpg' 
  },
  { 
    name: 'Kosovo',
     image: 'Kosovo.jpg'
  },
  { 
    name: 'Kuwait',
   image: 'Kuwait.jpg' 
  },
  { 
    name: 'Kyrgyzstan',
   image: 'Kyrgyzstan.jpg' 
  },
  { 
    name: 'Lao',
     image: 'Lao.png'
  },
  { 
    name: 'Latvia',
   image: 'Latvia.png' 
  },
  { 
    name: 'Lebanon',
   image: 'Lebanon.png' 
  },
  { 
    name: 'Lesotho',
     image: 'Lesotho.png'
  },
  { 
    name: 'Liberia',
   image: 'Liberia.jpg' 
  },
  { 
    name: 'Libya',
   image: 'Libya.png' 
  },
  { 
    name: 'Liechtenstein',
     image: 'Liechtenstein.png'
  },
  { 
    name: 'Lithuania',
   image: 'Lithuania.png' 
  },
  { 
    name: 'Luxembourg',
   image: 'Luxembourg.png' 
  },
  { 
    name: 'Macau',
     image: 'Macau.png'
  },
  { 
    name: 'Madagascar',
   image: 'Madagascar.png' 
  },
  { 
    name: 'Malawi',
   image: 'Malawi.png' 
  },
  { 
    name: 'Malaysia',
     image: 'Malaysia.jpg'
  },
  { 
    name: 'Maldives',
   image: 'Maldives.png' 
  },
  { 
    name: 'Mali',
   image: 'Mali.png' 
  },
  { 
    name: 'Malta',
     image: 'Malta.png'
  },
  { 
    name: 'Marshall Islands',
   image: 'Marshall Islands.jpg' 
  },
  { 
    name: 'Mauritius',
     image: 'Mauritius.png'
  },
  { 
    name: 'Mayotte',
   image: 'Mayotte.jpg' 
  },
  { 
    name: 'Mexico',
   image: 'Mexico.png' 
  },
  { 
    name: 'Micronesia',
     image: 'Micronesia.png'
  },
  { 
    name: 'Moldova',
   image: 'Moldova.png' 
  },
  { 
    name: 'Mongolia',
     image: 'Mongolia.jpg'
  },
  { 
    name: 'Montenegro',
   image: 'Montenegro.png' 
  },
  { 
    name: 'Montserrat',
   image: 'Montserrat.png' 
  },
  { 
    name: 'Morocco',
     image: 'Morocco.jpg'
  },
  { 
    name: 'Mozambique',
   image: 'Mozambique.jpg' 
  },
  { 
    name: 'Myanmar',
   image: 'Myanmar.png' 
  },
  { 
    name: 'Namibia',
     image: 'Namibia.png'
  },
  { 
    name: 'Nauru',
   image: 'Nauru.png' 
  },
  { 
    name: 'Netherlands',
     image: 'Netherlands.jpg'
  },
  { 
    name: 'New Caledonia',
   image: 'New Caledonia.jpg' 
  },
  { 
    name: 'New Zealand',
   image: 'New Zealand.jpg' 
  },
  { 
    name: 'Nicaragua',
     image: 'Nicaragua.png'
  },
  { 
    name: 'Niger',
   image: 'Niger.png' 
  },
  { 
    name: 'Nigeria',
   image: 'Nigeria.png' 
  },
  { 
    name: 'Niue',
     image: 'Niue.png'
  },
  { 
    name: 'North Macedonia',
   image: 'North Macedonia.jpg' 
  },
  { 
    name: 'Northern Mariana Islands',
   image: 'Northern Mariana Islands.png' 
  },
  { 
    name: 'Norway',
     image: 'Norway.png'
  },
  { 
    name: 'Oman',
   image: 'Oman.png' 
  },
  { 
    name: 'Pakistan',
   image: 'Pakistan.jpg' 
  },
  { 
    name: 'Palau',
     image: 'Palau.png'
  },
  { 
    name: 'Palestine',
   image: 'Palestine.jpg' 
  },
  { 
    name: 'Panama',
   image: 'Panama.png' 
  },
  { 
    name: 'Papua New Guinea',
     image: 'Papua New Guinea.png'
  },
  { 
    name: 'Paraguay',
   image: 'Paraguay.png' 
  },
  { 
    name: 'Peru',
   image: 'Peru.jpg' 
  },
  { 
    name: 'Philippines',
     image: 'Philippines.jpg'
  },
  { 
    name: 'Pitcairn Island',
   image: 'Pitcairn Island.png' 
  },
  { 
    name: 'Poland',
   image: 'Poland.png' 
  },
  { 
    name: 'Portugal',
     image: 'Portugal-flag.png'
  },
  { 
    name: 'Puerto Rico',
   image: 'Puerto Rico.jpg' 
  },
  { 
    name: 'Qatar',
   image: 'Qatar.png' 
  },
  { 
    name: 'Reunion Island',
     image: 'Reunion Island.png'
  },
  { 
    name: 'Romania',
   image: 'Romania.png' 
  },
  { 
    name: 'Russian Federation',
   image: 'Russian Federation.png' 
  },
  { 
    name: 'Rwanda',
     image: 'Rwanda.jpg'
  },
  { 
    name: 'Saint Kitts and Nevis',
   image: 'Saint Kitts and Nevis.png' 
  },
  { 
    name: 'Saint Lucia',
   image: 'Saint Lucia.jpg' 
  },
  { 
    name: 'Saint Vincent and the Grenadines',
     image: 'Saint Vincent and the Grenadines.png'
  },
  { 
    name: 'Samoa',
   image: 'Samoa.png' 
  },
  { 
    name: 'San Marino',
   image: 'San Marino.png' 
  },
  { 
    name: 'Sao Tome and Principe',
     image: 'Sao Tome and Principe.png'
  },
  { 
    name: 'Saudi Arabia',
   image: 'Saudi Arabia.jpg' 
  },
  { 
    name: 'Senegal',
   image: 'Senegal.jpg' 
  },
  { 
    name: 'Serbia',
     image: 'Serbia.jpg'
  },
  { 
    name: 'Seychelles',
   image: 'Seychelles.jpg' 
  },
  { 
    name: 'Sierra Leone',
   image: 'Sierra Leone.png' 
  },
  { 
    name: 'Singapore',
     image: 'Singapore.png'
  },
  { 
    name: 'Slovakia',
   image: 'Slovakia.jpg' 
  },
  { 
    name: 'Slovenia',
   image: 'Slovenia.png' 
  },
  { 
    name: 'Solomon Islands',
     image: 'Solomon Islands.png'
  },
  { 
    name: 'Somalia',
   image: 'Somalia.png' 
  },
  { 
    name: 'South Africa',
   image: 'South Africa.png' 
  },
  { 
    name: 'South Sudan',
   image: 'South Sudan.jpg' 
  },
  { 
    name: 'Spain',
     image: 'Spain.png'
  },
  { 
    name: 'Sudan',
   image: 'Sudan.png' 
  },
  { 
    name: 'Suriname',
     image: 'Suriname.png'
  },
  { 
    name: 'Swaziland (Eswatini)',
   image: 'Swaziland (Eswatini).png' 
  },
  { 
    name: 'Sweden',
   image: 'Sweden.png' 
  },
  { 
    name: 'Switzerland',
     image: 'Switzerland.png'
  },
  { 
    name: 'Syria',
   image: 'Syria.png' 
  },
  { 
    name: 'Taiwan',
   image: 'Taiwan.png' 
  },
  { 
    name: 'Tajikistan',
     image: 'Tajikistan.jpg'
  },
  { 
    name: 'Tanzania',
   image: 'Tanzania.jpg' 
  },
  { 
    name: 'Thailand',
   image: 'Thailand.png' 
  },
  { 
    name: 'Tibet',
     image: 'Tibet.png'
  },
  { 
    name: 'Timor-Leste',
   image: 'Timor-Leste.png' 
  },
  { 
    name: 'Togo',
   image: 'Togo.png' 
  },
  { 
    name: 'Tokelau',
     image: 'Tokelau.png'
  },
  { 
    name: 'Tonga',
   image: 'Tonga.png' 
  },
  { 
    name: 'Trinidad and Tobago',
   image: 'Trinidad and Tobago.jpg' 
  },
  { 
    name: 'Tunisia',
     image: 'Tunisia.png'
  },
  { 
    name: 'Turkey',
   image: 'Turkey.png' 
  },
  { 
    name: 'Turkmenistan',
   image: 'Turkmenistan.jpg' 
  },
  { 
    name: 'Turks and Caicos Islands',
     image: 'Turks and Caicos Islands.png'
  },
  { 
    name: 'Tuvalu',
   image: 'Tuvalu.jpg' 
  },
  { 
    name: 'Uganda',
   image: 'Uganda.png' },
  { 
    name: 'United Arab Emirates',
     image: 'United Arab Emirates.jpg'
  },
  { 
    name: 'United Kingdom',
   image: 'United Kingdom.jpg' 
  },
  { 
    name: 'United States',
     image: 'United States.jpg'
  },
  { 
    name: 'Uruguay',
   image: 'Uruguay.png' 
  },
  { 
    name: 'Uzbekistan',
   image: 'Uzbekistan.jpg' },
  { 
    name: 'Vanuatu',
     image: 'Vanuatu.png'
  },
  { 
    name: 'Venezuela',
   image: 'Venezuela.png' 
  },
  { 
    name: 'Vietnam',
   image: 'Vietnam.png' 
  },
  { 
    name: 'Western Sahara',
   image: 'Western Sahara.png' 
  },
  { 
    name: 'Yemen',
   image: 'Yemen.png' },
  { 
    name: 'Zambia',
     image: 'Zambia.png'
  },
  { 
    name: 'Zimbabwe',
   image: 'Zimbabwe.jpg' 
  }
 
];

const selectElement = document.getElementById('Country');
const selectedImageElement = document.getElementById('selectedImage');
const selectedCountryElement = document.getElementById('selectedCountry');
const selectedCountryContainer = document.getElementById('selectedCountryContainer');

// Populate the select element with options
countries.forEach(country => {
  const option = document.createElement('option');
  option.value = country.name;
  option.textContent = country.name;
  selectElement.appendChild(option);
});

// Event listener for the select element
selectElement.addEventListener('change', (event) => {
  const selectedCountry = event.target.value;

  // Find the selected country object in the countries array
  const country = countries.find(country => country.name === selectedCountry);

  if (country) {
      // Update the image source and height
      selectedImageElement.src = 'img/' + country.image;
      selectedImageElement.style.height = '20px';
      selectedImageElement.style.marginTop = '-30px ';
      selectedImageElement.style.marginLeft = '15px ';
      selectedImageElement.style.width = '30px';

      // Update the country name
      selectedCountryElement.textContent = country.name;

      // Show the selected country container
      selectedCountryContainer.style.display = 'flex';
  } else {
      // Reset the image source and height
      selectedImageElement.src = '';
      selectedImageElement.style.height = '0';

      // Reset the country name
      selectedCountryElement.textContent = '';

      // Hide the selected country container
      selectedCountryContainer.style.display = 'none';
  }
});