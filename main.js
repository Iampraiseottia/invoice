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


// Defining the Countries
// const countries = [
//     'Afghanistan',
//     'Albania', 
//     'Algeria', 
//     'American Samoa', 
//     'Andorra', 
//     'Angola', 
//     'Anguilla',
//     'Antarctica',
//     'Antigua and Barbuda', 
//     'Argentina', 
//     'Armenia', 
//     'Aruba', 
//     'Australia', 
//     'Austria',
//     'Azerbaijan',
//     'Bahamas', 
//     'Bahrain', 
//     'Bangladesh', 
//     'Barbados', 
//     'Belarus', 
//     'Belgium',
//     'Belize',
//     'Benin', 
//     'Bermuda', 
//     'Bhutan', 
//     'Bolivia', 
//     'Bosnia and Herzegovina', 
//     'Botswana',
//     'Brazil',
//     'Brunei Darussalam', 
//     'Bulgaria', 
//     'Burkina Faso', 
//     'Burundi', 
//     'Cambodia', 
//     'Cameroon',
//     'Canada',
//     'Cape Verde', 
//     'Cayman Islands', 
//     'Central African Republic', 
//     'Chad', 
//     'Chile', 
//     'China',
//     'Christmas Island',
//     'Cocos (Keeling) Islands', 
//     'Colombia', 
//     'Comoros', 
//     'Democratic Republic of the Congo (Kinshasa)', 
//     'Congo, Republic of (Brazzaville)', 
//     'Cook Islands',
//     'Costa Rica',
//     `Côte D'ivoire (Ivory Coast)`, 
//     'Croatia', 
//     'Cuba', 
//     'Cyprus', 
//     'Czech Republic', 
//     'Denmark',
//     'Djibouti',
//     'Dominica', 
//     'Dominican Republic', 
//     'East Timor (Timor-Leste)', 
//     'Ecuador', 
//     'Egypt', 
//     'El Salvador',
//     'Equatorial Guinea',
//     'Eritrea', 
//     'Estonia', 
//     'Ethiopia', 
//     'Falkland Islands', 
//     'Faroe Islands', 
//     'Fiji',
//     'Finland',
//     'France', 
//     'Gabon', 
//     'Gambia',
//     'Georgia',
//     'Germany', 
//     'Ghana', 
//     'Gibraltar', 
//     'Greece', 
//     'Greenland', 
//     'Grenada',
//     'Guadeloupe',
//     'Guam', 
//     'Guatemala', 
//     'Guinea', 
//     'Guinea-Bissau', 
//     'Guyana', 
//     'Haiti',
//     'Holy See',
//     'Honduras', 
//     'Hong Kong', 
//     'Hungary', 
//     'Iceland', 
//     'India', 
//     'Indonesia',
//     'Iran',
//     'Iraq', 
//     'Ireland', 
//     'Israel', 
//     'Italy', 
//     'Ivory Coast', 
//     'Jamaica',
//     'Japan',
//     'Jordan', 
//     'Kazakhstan', 
//     'Kenya', 
//     'Kiribati', 
//     'North Korea', 
//     'South Korea',
//     'Kosovo',
//     'Kuwait', 
//     'Kyrgyzstan', 
//     'Lao', 
//     'Latvia', 
//     'Lebanon', 
//     'Lesotho',
//     'Liberia',
//     'Libya', 
//     'Liechtenstein', 
//     'Lithuania', 
//     'Luxembourg', 
//     'Macau', 
//     'Madagascar',
//     'Malawi',
//     'Malaysia', 
//     'Maldives', 
//     'Mali', 
//     'Malta', 
//     'Marshall Islands', 
//     'Martinique',
//     'Mauritania',
//     'Mauritius', 
//     'Mayotte', 
//     'Mexico', 
//     'Micronesia', 
//     'Moldova', 
//     'Monaco',
//     'Mongolia',
//     'Montenegro', 
//     'Montserrat', 
//     'Morocco', 
//     'Mozambique', 
//     'Myanmar, Burma', 
//     'Namibia',
//     'Nauru',
//     'Nepal', 
//     'Netherlands    ', 
//     'New Caledonia', 
//     'New Zealand', 
//     'Nicaragua', 
//     'Niger',
//     'Nigeria', 
//     'Niue', 
//     'North Macedonia', 
//     'Northern Mariana Islands', 
//     'Norway', 
//     'Oman', 
//     'Pakistan', 
//     'Palau', 
//     'Palestine', 
//     'Panama', 
//     'Papua New Guinea', 
//     'Paraguay', 
//     'Peru', 
//     'Philippines', 
//     'Pitcairn Island', 
//     'Poland', 
//     'Portugal', 
//     'Puerto Rico', 
//     'Qatar', 
//     'Reunion Island', 
//     'Romania', 
//     'Russian Federation', 
//     'Rwanda', 
//     'Saint Kitts and Nevis', 
//     'Saint Lucia', 
//     'Saint Vincent and the Grenadines', 
//     'Samoa', 
//     'San Marino', 
//     'Sao Tome and Principe', 
//     'Saudi Arabia', 
//     'Senegal', 
//     'Serbia', 
//     'Seychelles', 
//     'Sierra Leone', 
//     'Singapore', 
//     'Slovakia', 
//     'Slovenia', 
//     'Solomon Islands', 
//     'Somalia', 
//     'South Africa', 
//     'South Sudan', 
//     'Spain', 
//     'Sri Lanka', 
//     'Sudan', 
//     'Suriname', 
//     'Swaziland (Eswatini)', 
//     'Sweden', 
//     'Switzerland', 
//     'Syria', 
//     'Taiwan', 
//     'Tajikistan', 
//     'Tanzania', 
//     'Thailand', 
//     'Tibet', 
//     'Timor-Leste', 
//     'Togo', 
//     'Tokelau',
//     'Tonga', 
//     'Trinidad and Tobago', 
//     'Tunisia', 
//     'Turkey', 
//     'Turkmenistan', 
//     'Turks and Caicos Islands', 
//     'Tuvalu', 
//     'Uganda', 
//     'Ukraine', 
//     'United Arab Emirates', 
//     'United Kingdom', 
//     'Tanzania', 
//     'United States', 
//     'Uruguay', 
//     'Uzbekistan', 
//     'Vanuatu', 
//     'Venezuela',
//     'Vietnam', 
//     'Wallis and Futuna Islands', 
//     'Western Sahara', 
//     'Yemen',
//     'Zambia', 
//     'Zimbabwe'

// ];

// // Function to populate the country select element
// const populateCountryOptions = () => {
//     countries.forEach(countryName => {
//       const option = document.createElement('option');
//       option.value = countryName;
//       option.textContent = countryName;
//       country.appendChild(option);
//     });
// };

// populateCountryOptions();




const countries = [
  { 
    name: 'Afghanistan',
   image: 'afghanistan.png' 
  },
  { 
    name: 'Albania',
   image: 'albania.png' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
  },
  { 
    name: 'Afghanistan',
   image: 'afghanistan.jpg' 
  },
  { 
    name: 'Albania',
   image: 'albania.jpg' },
  { 
    name: 'Algeria',
     image: 'algeria.jpg'
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