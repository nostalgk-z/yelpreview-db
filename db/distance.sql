CREATE OR REPLACE FUNCTION DistanceBetween(lat1 real, lon1 real, lat2 real, lon2 real) RETURNS INTEGER AS $DistanceBetween$
DECLARE
    earth_radius real := 3958.8;
    rads_per_degree real := PI() / 180;

    lat1_rad real;
    lon1_rad real;
    lat2_rad real;
    lon2_rad real;

    delta_lat real;
    delta_lon real;

    angle real;
    distance real;

BEGIN
    lat1_rad = lat1 * rads_per_degree;
    lon1_rad = lon1 * rads_per_degree;
    lat2_rad = lat2 * rads_per_degree;
    lon2_rad = lon2 * rads_per_degree;

    delta_lat = lat2_rad - lat1_rad;
    delta_lon = lon2_rad - lon1_rad;

    angle = 2 * asin(sqrt(
        (sin(delta_lat/2) * sin(delta_lat/2))
        + (cos(lat1_rad) * cos(lat2_rad)
        * sin(delta_lon/2) * sin(delta_lon/2))));
    distance = earth_radius * angle;

    RETURN distance;
END;
$DistanceBetween$ LANGUAGE plpgsql;