import "jasmine";
import { SRTextParser } from '../src/index';
const util = require('util')

describe('parse prj file data', function () {
    const sample = 'PROJCS["NAD_1983_CORS96_StatePlane_California_V_FIPS_0405",GEOGCS["NAD83(CORS96)",DATUM["NAD83_Continuously_Operating_Reference_Station_1996",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],AUTHORITY["EPSG","1133"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","6783"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["latitude_of_origin",33.5],PARAMETER["central_meridian",-118],PARAMETER["standard_parallel_1",34.0333333333333],PARAMETER["standard_parallel_2",35.4666666666667],PARAMETER["false_easting",2000000],PARAMETER["false_northing",500000],UNIT["metre",1,AUTHORITY["EPSG","9001"]],AXIS["Easting",EAST],AXIS["Northing",NORTH],AUTHORITY["ESRI","103236"]]';
    it('should parse without errors', () => {
        const parser = new SRTextParser();
        const result = parser.Parse(sample);
        console.log(util.inspect(result, {showHidden: false, depth: null}));
    });
});