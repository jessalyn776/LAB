class VehicleFleet {
    constructor(vehicles = []) {
        this.vehicles = vehicles;
    }
    calculateTotalMileage() {
        return this.vehicles.reduce((acc, vehicle) => acc + vehicle.mileage, 0);
    }
    filterByType(type) {
        return this.vehicles.filter(vehicle => vehicle.type.toLowerCase() === type.toLowerCase());
    }
    mostFuelEfficientVehicle() {
        return this.vehicles.reduce((mostEfficient, vehicle) => {
            if (!mostEfficient || vehicle.fuelEfficiency > mostEfficient.fuelEfficiency) {
                return vehicle;
            }
            return mostEfficient;
        }, null);
    }
    groupByMileageRanges() {
        const mileageRanges = {
            '0-50000': [],
            '50001-100000': [],
            '100001+': []
        };

        this.vehicles.forEach(vehicle => {
            if (vehicle.mileage <= 50000) {
                mileageRanges[`0-50000`].push(vehicle);
            } else if (vehicle.mileage <= 100000) {
                mileageRanges[`50001-100000`].push(vehicle);
            } else {
                mileageRanges[`100001+`].push(vehicle);
            }
        });

        return mileageRanges;
    }

    async fetchNewVehicles(newVehicles) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.vehicles = [...this.vehicles, ...newVehicles];
    }
}

const vehicleFleet = new VehicleFleet([
    {model: `Model 1`, type: `Sedan`, mileage: 30000, fuelEfficiency: 20},
    {model: `Model 2`, type: `SUV`, mileage: 70000, fuelEfficiency: 15},
    {model: `Model 3`, type: `Sedan`, mileage: 40000, fuelEfficiency: 25},
    {model: `Model 4`, type: `Truck`, mileage: 100000, fuelEfficiency: 10},
    {model: `Model 5`, type: `Sedan`, mileage: 20000, fuelEfficiency: 22},
]);

console.log(`Total mileage:`, vehicleFleet.calculateTotalMileage());
console.log(`Sedan Vehicles:`, vehicleFleet.filterByType(`Sedan`));
console.log(`Most fuel-efficient vehicle:`, vehicleFleet.mostFuelEfficientVehicle());
console.log(`Vehicles grouped by mileage ranges:`, vehicleFleet.groupByMileageRanges());

const newVehicles = [
    {model: `Model 6`, type: `SUV`, mileage: 50000, fuelEfficiency: 18},
    {model: `Model 7`, type: `Truck`, mileage: 80000, fuelEfficiency: 12},
];

vehicleFleet.fetchNewVehicles(newVehicles).then(() => {
    console.log(`Updated vehicle fleet:`, vehicleFleet.vehicles);
});
