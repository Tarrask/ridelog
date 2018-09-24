
const  mongodb  = require('mongodb');
const XmlStream = require('xml-stream');
const geolib = require('geolib');

module.exports = {

  friendlyName: 'Gpx processor',

  description: '',

  inputs: {
    id: {
      type: 'ref'
    }
  },

  exits: {

  },

  fn: async function (inputs, exits) {
    const start = Date.now();
    const ride = await Ride.findOne(inputs.id);
    const db = (await sails.getDatastore('default')).manager;
    const bucket = new mongodb.GridFSBucket(db, {
      bucketName: 'ride'
    });

    console.log(ride);
    if(!ride.gpxFile) {
      return exits.success();
    }

    const readStream = bucket.openDownloadStream(ride.gpxFile);

    var path = [];
    var dplus = 0;
    var dplusFiltered = 0;
    var dmoins = 0;
    var dmoinsFiltered = 0;

    var logCount = 0;

    var first = true;
    var lastPoint;
    var totalDistance = 0;

    var inclinaisonProp = {
      bigDown: 0,
      down: 0,
      flat: 0,
      up: 0,
      bigUp: 0
    };

    // { ele: '456.79998779296875',
    //  time: '2018-05-12T12:23:36.000Z',
    //  extensions: { 'ns3:TrackPointExtension': { 'ns3:atemp': '27.0', 'ns3:hr': '131' } },
    //  '$':
    //  { lat: '46.25152534805238246917724609375',
    //    lon: '7.02035143040120601654052734375' } }
    var xml = new XmlStream(readStream);
    xml.on('endElement: trkpt', node => {
      if(first) {
        first = false;
        lastPoint = {
          longitude: parseFloat(node.$.lon),
          latitude: parseFloat(node.$.lat),
          elevation: parseFloat(node.ele),
          filteredElevation: parseFloat(node.ele),
          date: new Date(node.time),
          temperature: parseFloat(node.extensions['ns3:TrackPointExtension']['ns3:atemp']),
          heartRate: parseFloat(node.extensions['ns3:TrackPointExtension']['ns3:hr'])
        };
        path.push(lastPoint);
        console.log(lastPoint);
      }
      else {
        let point = {
          longitude: parseFloat(node.$.lon),
          latitude: parseFloat(node.$.lat),
          elevation: parseFloat(node.ele),
          date: new Date(node.time),
          temperature: parseFloat(node.extensions['ns3:TrackPointExtension']['ns3:atemp']),
          heartRate: parseFloat(node.extensions['ns3:TrackPointExtension']['ns3:hr'])
        };

        point.filteredElevation = (point.elevation + lastPoint.elevation) / 2;
        point.deltaDistance = geolib.getDistance(lastPoint, point, 1, 6);
        totalDistance += point.deltaDistance;

        point.inclinaison = (point.elevation - lastPoint.elevation) / point.deltaDistance;
        if(point.inclinaison < -0.15) { inclinaisonProp.bigDown += point.deltaDistance; }
        else if(point.inclinaison < -0.02) { inclinaisonProp.down += point.deltaDistance; }
        else if(point.inclinaison <= 0.02) { inclinaisonProp.flat += point.deltaDistance; }
        else if(point.inclinaison <= 0.15) { inclinaisonProp.up += point.deltaDistance; }
        else { inclinaisonProp.bigUp += point.deltaDistance; }

        if(point.elevation > lastPoint.elevation) {  dplus += point.elevation - lastPoint.elevation; }
        else { dmoins += point.elevation - lastPoint.elevation; }

        if(point.filteredElevation > lastPoint.filteredElevation) { dplusFiltered += point.filteredElevation - lastPoint.filteredElevation; }
        else { dmoinsFiltered += point.filteredElevation - lastPoint.filteredElevation; }

        lastPoint = point;

        if(logCount++ < 100) {
          console.log(point);
        }

        path.push(point);
      }
    });

    xml.on('end', () => {
      const duration = path[path.length - 1].date - path[0].date;
      const end = Date.now();
      exits.success({ dplus, dmoins, duration, inclinaisonProp, dplusFiltered, dmoinsFiltered, totalDistance, path, computationTime: end - start });
    });
  }
};
