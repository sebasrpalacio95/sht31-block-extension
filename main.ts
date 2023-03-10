let I2C_ADDRESS = 0x44;
let TEMP_CMD = 0x2C;
let HUMIDITY_CMD = 0x2C;
let READ_REG = 0xE7;

let temp_msb = 0;
let temp_lsb = 0;
let temp_checksum = 0;
let humidity_msb = 0;
let humidity_lsb = 0;
let humidity_checksum = 0;
//% color=#4c6ef5 weight=25 icon="\uf043" block="SHT3x Sensor"
namespace CipSHT3xDriver {
   
    pins.i2cWriteNumber(I2C_ADDRESS, TEMP_CMD, NumberFormat.UInt8BE, false);
    basic.pause(20);
    temp_msb = pins.i2cReadNumber(I2C_ADDRESS, NumberFormat.UInt8BE);
    temp_lsb = pins.i2cReadNumber(I2C_ADDRESS, NumberFormat.UInt8BE);
    temp_checksum = pins.i2cReadNumber(I2C_ADDRESS, NumberFormat.UInt8BE);

    // Enviar comando para leer la humedad
    pins.i2cWriteNumber(I2C_ADDRESS, HUMIDITY_CMD, NumberFormat.UInt8BE, false);
    basic.pause(20);
    humidity_msb = pins.i2cReadNumber(I2C_ADDRESS, NumberFormat.UInt8BE);
    humidity_lsb = pins.i2cReadNumber(I2C_ADDRESS, NumberFormat.UInt8BE);
    humidity_checksum = pins.i2cReadNumber(I2C_ADDRESS, NumberFormat.UInt8BE);
    /**
     * Read Relative Humidity from the SHT3x Sensor.
     * Returns a number describing the relative humidity in percentage % relative
     * humidity
    */
    //% blockId="SHT3x_read_humidity"
    //% block="Leer Humedad"
    export function read_humidity(): number {
        let humidity = (((humidity_msb * 256) + humidity_lsb) * 100) / 65535.0;
        return humidity;
    }
    /**
     * Read Temperature in degrees celcius from the SHT3x sensor.
     * Returns a number describing the ambient temperature in degrees celsius
    */
    //% blockId="SHT3xDriver_read_temperature"
    //% block="Leer Temperatura"
    export function read_temperature(): number {
        let temperature = ((((temp_msb * 256) + temp_lsb) * 175) / 65535.0) - 45;
        return temperature;
    }
    
}

