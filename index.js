let response;
let fromData;

const vm = new Vue({
    el: "#home-content",
    data: {
        active: [],
        inactive: [],
        overdue: [],
    },
    filters: {
        asPrice (value) {
            return ("$" + (value.toString()) + " USD")
        },
        asPhoneNumber(value) {
            const cleaned = ('' + value).replace(/\D/g, '');
            const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            if (match) {
                return '(' + match[1] + ')-' + match[2] + '-' + match[3]
            }
            return null
        },
        asDate(value) {
            const options = {year: 'numeric', month: '2-digit', day: 'numeric' };
            const result = new Date(value);
            return ("(" + result.toLocaleDateString("en-us", options) + ")")
        }
    },
    mounted: async function() {
        await axios
            .get("https://frontiercodingtests.azurewebsites.net/api/accounts/getall")
            .then(back => (response = back));
        console.log(response.status);
        fromData = response.data;
        fromData.forEach(data => {
           switch(data.AccountStatusId) {
               default:
                   this.active.push(data);
                   break;
               case 1:
                   this.inactive.push(data);
                   break;
               case 2:
                   this.overdue.push(data);
                   break;
           }
        });
    }
});