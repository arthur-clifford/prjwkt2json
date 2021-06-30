import "jasmine";
import { SRTextParser } from '../src/index';
const util = require('util')
describe('parse prj file data', function () {
    const data = 'PROJCS["NAD_1983_StatePlane_California_V_FIPS_0405_Feet",GEOGCS["GCS_North_American_1983",DATUM["D_North_American_1983",SPHEROID["GRS_1980",6378137,298.257222101]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]],PROJECTION["Lambert_Conformal_Conic"],PARAMETER["False_Easting",6561666.666666666],PARAMETER["False_Northing",1640416.666666667],PARAMETER["Central_Meridian",-118],PARAMETER["Standard_Parallel_1",34.03333333333333],PARAMETER["Standard_Parallel_2",35.46666666666667],PARAMETER["Latitude_Of_Origin",33.5],UNIT["Foot_US",0.30480060960121924]]';
    it('should instantiate', () => {
        const parser = new SRTextParser();
        expect(parser).not.toBeNull();
        expect(parser).not.toBeUndefined();
    });
    it('should parse without errors', () => {
        const parser = new SRTextParser();
        const result = parser.Parse(data);
        
    });
    it('should return an object from Parse', () => {
        const parser = new SRTextParser();
        const result = parser.Parse(data);
        expect(typeof result).toBe('object');

    });

    it('should only have one key at the top level', () => {
        const parser = new SRTextParser();
        const result = parser.Parse(data);
        
        const keys = Object.keys(result);
        expect(keys.length).toBe(1);
    });
    it('should have the correct content', () => {
        const parser = new SRTextParser();
        const result = parser.Parse(data);
        const keys = Object.keys(result);
        const firstKey = keys[0];
        console.log(util.inspect(result,{showHidden:false,depth:null}));
        expect(firstKey).toEqual('PROJCS');
        expect(result.PROJCS.label).toBeTruthy();
        expect(result.PROJCS.label).toEqual('NAD 1983 StatePlane California V FIPS 0405 Feet');
        expect(result.PROJCS.GEOGCS).toBeTruthy();
        expect(result.PROJCS.GEOGCS.label).toEqual('GCS North American 1983');
        expect(result.PROJCS.GEOGCS.DATUM).toBeTruthy();
        expect(result.PROJCS.GEOGCS.DATUM.label).toEqual('D North American 1983');
        expect(result.PROJCS.GEOGCS.DATUM.SPHEROID).toBeTruthy();
        expect(result.PROJCS.GEOGCS.DATUM.SPHEROID.label).toEqual('GRS 1980');
        expect(result.PROJCS.GEOGCS.DATUM.SPHEROID.values).toBeTruthy();
        expect(result.PROJCS.GEOGCS.DATUM.SPHEROID.values.length).toEqual(2);
        expect(result.PROJCS.GEOGCS.DATUM.SPHEROID.values[0]).toEqual('6378137');
        expect(result.PROJCS.GEOGCS.DATUM.SPHEROID.values[1]).toEqual('298.257222101');
        expect(result.PROJCS.GEOGCS.PRIMEM).toBeTruthy();
        expect(result.PROJCS.GEOGCS.PRIMEM.label).toEqual('Greenwich');
        expect(result.PROJCS.GEOGCS.PRIMEM.values[0]).toEqual('0');
        expect(result.PROJCS.GEOGCS.UNIT).toBeTruthy();
        expect(result.PROJCS.GEOGCS.UNIT.label).toEqual('Degree');
        expect(result.PROJCS.GEOGCS.UNIT.values[0]).toEqual('0.017453292519943295');
        expect(result.PROJCS.PROJECTION).toBeTruthy();
        expect(result.PROJCS.PROJECTION.label).toEqual('Lambert Conformal Conic');
        expect(Array.isArray(result.PROJCS.PARAMETER)).toBeTrue();
        expect(result.PROJCS.PARAMETER[0].label).toEqual('False Easting');
        expect(result.PROJCS.PARAMETER[0].values[0]).toEqual('6561666.666666666');    
        expect(result.PROJCS.PARAMETER[1].label).toEqual('False Northing');
        expect(result.PROJCS.PARAMETER[1].values[0]).toEqual('1640416.666666667');    
        expect(result.PROJCS.PARAMETER[2].label).toEqual('Central Meridian');
        expect(result.PROJCS.PARAMETER[2].values[0]).toEqual('-118');    
        expect(result.PROJCS.PARAMETER[3].label).toEqual('Standard Parallel 1');
        expect(result.PROJCS.PARAMETER[3].values[0]).toEqual('34.03333333333333');    
        expect(result.PROJCS.PARAMETER[4].label).toEqual('Standard Parallel 2');
        expect(result.PROJCS.PARAMETER[4].values[0]).toEqual('35.46666666666667');    
        expect(result.PROJCS.PARAMETER[5].label).toEqual('Latitude Of Origin');
        expect(result.PROJCS.PARAMETER[5].values[0]).toEqual('33.5');    
        
        

        
        //expect(result.PROJCS.GEOCS.DATUM.PRIMEM.values.length).toEqual('Greenwich');
        
    });
});
