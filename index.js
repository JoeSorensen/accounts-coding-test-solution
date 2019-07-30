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
            return ("$" + (value.toString()))
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