Globals.init(29);
Breeds.add("CLOUDS", "turtle");
Breeds.get("CLOUDS").vars =["CLOUD-NUM"];
Breeds.add("SUNRAYS", "sunray");
Breeds.get("SUNRAYS").vars =[""];
Breeds.add("IR", "turtle");
Breeds.get("IR").vars =[""];
Breeds.add("HEAT", "turtle");
Breeds.get("HEAT").vars =[""];
Breeds.add("CO2", "turtle");
Breeds.get("CO2").vars =[""];
Breeds.add("DOTS", "dot");
Breeds.get("DOTS").vars =[""];
Breeds.add("ICONS", "icon");
Breeds.get("ICONS").vars =[""];world = new World(-24, 24, -15, 15, 11.12245, false, true, {"default":{"rotate":true,"elements":[{"xcors":[150.0,40.0,150.0,260.0],"ycors":[5.0,250.0,205.0,250.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"airplane":{"rotate":true,"elements":[{"xcors":[150.0,135.0,120.0,120.0,15.0,15.0,120.0,135.0,105.0,120.0,150.0,180.0,210.0,165.0,180.0,285.0,285.0,180.0,180.0,165.0],"ycors":[0.0,15.0,60.0,105.0,165.0,195.0,180.0,240.0,270.0,285.0,270.0,285.0,270.0,240.0,180.0,195.0,165.0,105.0,60.0,15.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"arrow":{"rotate":true,"elements":[{"xcors":[150.0,0.0,105.0,105.0,195.0,195.0,300.0],"ycors":[0.0,150.0,150.0,293.0,293.0,150.0,150.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"box":{"rotate":false,"elements":[{"xcors":[150.0,285.0,285.0,150.0],"ycors":[285.0,225.0,75.0,135.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[150.0,15.0,150.0,285.0],"ycors":[135.0,75.0,15.0,75.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[15.0,15.0,150.0,150.0],"ycors":[75.0,225.0,285.0,135.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x1":150.0,"y1":285.0,"x2":150.0,"y2":135.0,"type":"line","color":"rgba(0, 0, 0, 1.0)","filled":false,"marked":false},{"x1":150.0,"y1":135.0,"x2":15.0,"y2":75.0,"type":"line","color":"rgba(0, 0, 0, 1.0)","filled":false,"marked":false},{"x1":150.0,"y1":135.0,"x2":285.0,"y2":75.0,"type":"line","color":"rgba(0, 0, 0, 1.0)","filled":false,"marked":false}]},"bug":{"rotate":true,"elements":[{"x":96.0,"y":182.0,"diam":108.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":110.0,"y":127.0,"diam":80.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":110.0,"y":75.0,"diam":80.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x1":150.0,"y1":100.0,"x2":80.0,"y2":30.0,"type":"line","color":"rgba(141, 141, 141, 1.0)","filled":false,"marked":true},{"x1":150.0,"y1":100.0,"x2":220.0,"y2":30.0,"type":"line","color":"rgba(141, 141, 141, 1.0)","filled":false,"marked":true}]},"butterfly":{"rotate":true,"elements":[{"xcors":[150.0,209.0,225.0,225.0,195.0,165.0,150.0],"ycors":[165.0,199.0,225.0,255.0,270.0,255.0,240.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[150.0,89.0,75.0,75.0,105.0,135.0,150.0],"ycors":[165.0,198.0,225.0,255.0,270.0,255.0,240.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[139.0,100.0,55.0,25.0,10.0,10.0,25.0,40.0,85.0,139.0],"ycors":[148.0,105.0,90.0,90.0,105.0,135.0,180.0,195.0,194.0,163.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[162.0,200.0,245.0,275.0,290.0,290.0,275.0,260.0,215.0,162.0],"ycors":[150.0,105.0,90.0,90.0,105.0,135.0,180.0,195.0,195.0,165.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[150.0,135.0,120.0,135.0,150.0,165.0,180.0,165.0],"ycors":[255.0,225.0,150.0,120.0,105.0,120.0,150.0,225.0],"type":"polygon","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"x":135.0,"y":90.0,"diam":30.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"x1":150.0,"y1":105.0,"x2":195.0,"y2":60.0,"type":"line","color":"rgba(0, 0, 0, 1.0)","filled":false,"marked":false},{"x1":150.0,"y1":105.0,"x2":105.0,"y2":60.0,"type":"line","color":"rgba(0, 0, 0, 1.0)","filled":false,"marked":false}]},"car":{"rotate":false,"elements":[{"xcors":[300.0,279.0,261.0,240.0,226.0,213.0,203.0,185.0,159.0,135.0,75.0,0.0,0.0,0.0,300.0,300.0],"ycors":[180.0,164.0,144.0,135.0,132.0,106.0,84.0,63.0,50.0,50.0,60.0,150.0,165.0,225.0,225.0,180.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":180.0,"y":180.0,"diam":90.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"x":30.0,"y":180.0,"diam":90.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"xcors":[162.0,132.0,134.0,209.0,194.0,189.0,180.0],"ycors":[80.0,78.0,135.0,135.0,105.0,96.0,89.0],"type":"polygon","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"x":47.0,"y":195.0,"diam":58.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":195.0,"y":195.0,"diam":58.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"circle":{"rotate":false,"elements":[{"x":0.0,"y":0.0,"diam":300.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"circle 2":{"rotate":false,"elements":[{"x":0.0,"y":0.0,"diam":300.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":30.0,"y":30.0,"diam":240.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false}]},"cloud":{"rotate":false,"elements":[{"x":13.0,"y":118.0,"diam":94.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":86.0,"y":101.0,"diam":127.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":51.0,"y":51.0,"diam":108.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":118.0,"y":43.0,"diam":95.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":158.0,"y":68.0,"diam":134.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"cow":{"rotate":false,"elements":[{"xcors":[200.0,197.0,179.0,177.0,166.0,140.0,93.0,78.0,72.0,49.0,48.0,37.0,25.0,25.0,45.0,103.0,179.0,198.0,252.0,272.0,293.0,285.0,255.0,242.0,224.0],"ycors":[193.0,249.0,249.0,196.0,187.0,189.0,191.0,179.0,211.0,209.0,181.0,149.0,120.0,89.0,72.0,84.0,75.0,76.0,64.0,81.0,103.0,121.0,121.0,118.0,167.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[73.0,86.0,62.0,48.0],"ycors":[210.0,251.0,249.0,208.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[25.0,16.0,9.0,23.0,25.0,39.0],"ycors":[114.0,195.0,204.0,213.0,200.0,123.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"cylinder":{"rotate":false,"elements":[{"x":0.0,"y":0.0,"diam":300.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"dot":{"rotate":false,"elements":[{"x":90.0,"y":90.0,"diam":120.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"face happy":{"rotate":false,"elements":[{"x":8.0,"y":8.0,"diam":285.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":60.0,"y":75.0,"diam":60.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"x":180.0,"y":75.0,"diam":60.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"xcors":[150.0,90.0,62.0,47.0,67.0,90.0,109.0,150.0,192.0,210.0,227.0,251.0,236.0,212.0],"ycors":[255.0,239.0,213.0,191.0,179.0,203.0,218.0,225.0,218.0,203.0,181.0,194.0,217.0,240.0],"type":"polygon","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false}]},"face neutral":{"rotate":false,"elements":[{"x":8.0,"y":7.0,"diam":285.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":60.0,"y":75.0,"diam":60.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"x":180.0,"y":75.0,"diam":60.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"xmin":60.0,"ymin":195.0,"xmax":240.0,"ymax":225.0,"type":"rectangle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false}]},"face sad":{"rotate":false,"elements":[{"x":8.0,"y":8.0,"diam":285.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":60.0,"y":75.0,"diam":60.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"x":180.0,"y":75.0,"diam":60.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"xcors":[150.0,90.0,62.0,47.0,67.0,90.0,109.0,150.0,192.0,210.0,227.0,251.0,236.0,212.0],"ycors":[168.0,184.0,210.0,232.0,244.0,220.0,205.0,198.0,205.0,220.0,242.0,229.0,206.0,183.0],"type":"polygon","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false}]},"fish":{"rotate":false,"elements":[{"xcors":[44.0,21.0,15.0,0.0,15.0,0.0,13.0,20.0,45.0],"ycors":[131.0,87.0,86.0,120.0,150.0,180.0,214.0,212.0,166.0],"type":"polygon","color":"rgba(255, 255, 255, 1.0)","filled":true,"marked":false},{"xcors":[135.0,119.0,95.0,76.0,46.0,60.0],"ycors":[195.0,235.0,218.0,210.0,204.0,165.0],"type":"polygon","color":"rgba(255, 255, 255, 1.0)","filled":true,"marked":false},{"xcors":[75.0,83.0,71.0,86.0,166.0,135.0],"ycors":[45.0,77.0,103.0,114.0,78.0,60.0],"type":"polygon","color":"rgba(255, 255, 255, 1.0)","filled":true,"marked":false},{"xcors":[30.0,151.0,226.0,280.0,292.0,292.0,287.0,270.0,195.0,151.0,30.0],"ycors":[136.0,77.0,81.0,119.0,146.0,160.0,170.0,195.0,210.0,212.0,166.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":215.0,"y":106.0,"diam":30.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false}]},"flag":{"rotate":false,"elements":[{"xmin":60.0,"ymin":15.0,"xmax":75.0,"ymax":300.0,"type":"rectangle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[90.0,270.0,90.0],"ycors":[150.0,90.0,30.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x1":75.0,"y1":135.0,"x2":90.0,"y2":135.0,"type":"line","color":"rgba(141, 141, 141, 1.0)","filled":false,"marked":true},{"x1":75.0,"y1":45.0,"x2":90.0,"y2":45.0,"type":"line","color":"rgba(141, 141, 141, 1.0)","filled":false,"marked":true}]},"flower":{"rotate":false,"elements":[{"xcors":[135.0,165.0,180.0,180.0,150.0,165.0,195.0,195.0,165.0],"ycors":[120.0,165.0,210.0,240.0,300.0,300.0,240.0,195.0,135.0],"type":"polygon","color":"rgba(89, 176, 60, 1.0)","filled":true,"marked":false},{"x":85.0,"y":132.0,"diam":38.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":130.0,"y":147.0,"diam":38.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":192.0,"y":85.0,"diam":38.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":85.0,"y":40.0,"diam":38.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":177.0,"y":40.0,"diam":38.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":177.0,"y":132.0,"diam":38.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":70.0,"y":85.0,"diam":38.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":130.0,"y":25.0,"diam":38.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":96.0,"y":51.0,"diam":108.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":113.0,"y":68.0,"diam":74.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"xcors":[189.0,219.0,249.0,279.0,234.0],"ycors":[233.0,188.0,173.0,188.0,218.0],"type":"polygon","color":"rgba(89, 176, 60, 1.0)","filled":true,"marked":false},{"xcors":[180.0,150.0,105.0,75.0,135.0],"ycors":[255.0,210.0,210.0,240.0,240.0],"type":"polygon","color":"rgba(89, 176, 60, 1.0)","filled":true,"marked":false}]},"house":{"rotate":false,"elements":[{"xmin":45.0,"ymin":120.0,"xmax":255.0,"ymax":285.0,"type":"rectangle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xmin":120.0,"ymin":210.0,"xmax":180.0,"ymax":285.0,"type":"rectangle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"xcors":[15.0,150.0,285.0],"ycors":[120.0,15.0,120.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x1":30.0,"y1":120.0,"x2":270.0,"y2":120.0,"type":"line","color":"rgba(0, 0, 0, 1.0)","filled":false,"marked":false}]},"leaf":{"rotate":false,"elements":[{"xcors":[150.0,135.0,120.0,60.0,30.0,60.0,60.0,15.0,30.0,15.0,40.0,45.0,60.0,90.0,105.0,120.0,105.0,120.0,135.0,150.0,165.0,180.0,195.0,180.0,195.0,210.0,240.0,255.0,263.0,285.0,270.0,285.0,240.0,240.0,270.0,240.0,180.0,165.0],"ycors":[210.0,195.0,210.0,210.0,195.0,180.0,165.0,135.0,120.0,105.0,104.0,90.0,90.0,105.0,120.0,120.0,60.0,60.0,30.0,15.0,30.0,60.0,60.0,120.0,120.0,105.0,90.0,90.0,104.0,105.0,120.0,135.0,165.0,180.0,195.0,210.0,210.0,195.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[135.0,135.0,120.0,105.0,105.0,135.0,165.0,165.0],"ycors":[195.0,240.0,255.0,255.0,285.0,285.0,240.0,195.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"line":{"rotate":true,"elements":[{"x1":150.0,"y1":0.0,"x2":150.0,"y2":300.0,"type":"line","color":"rgba(141, 141, 141, 1.0)","filled":false,"marked":true}]},"line half":{"rotate":true,"elements":[{"x1":150.0,"y1":0.0,"x2":150.0,"y2":150.0,"type":"line","color":"rgba(141, 141, 141, 1.0)","filled":false,"marked":true}]},"molecule water":{"rotate":true,"elements":[{"x":183.0,"y":63.0,"diam":84.0,"type":"circle","color":"rgba(255, 255, 255, 1.0)","filled":true,"marked":false},{"x":183.0,"y":63.0,"diam":84.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":false,"marked":false},{"x":75.0,"y":75.0,"diam":150.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":75.0,"y":75.0,"diam":150.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":false,"marked":false},{"x":33.0,"y":63.0,"diam":84.0,"type":"circle","color":"rgba(255, 255, 255, 1.0)","filled":true,"marked":false},{"x":33.0,"y":63.0,"diam":84.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":false,"marked":false}]},"pentagon":{"rotate":false,"elements":[{"xcors":[150.0,15.0,60.0,240.0,285.0],"ycors":[15.0,120.0,285.0,285.0,120.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"person":{"rotate":false,"elements":[{"x":110.0,"y":5.0,"diam":80.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[105.0,120.0,90.0,105.0,135.0,150.0,165.0,195.0,210.0,180.0,195.0],"ycors":[90.0,195.0,285.0,300.0,300.0,225.0,300.0,300.0,285.0,195.0,90.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xmin":127.0,"ymin":79.0,"xmax":172.0,"ymax":94.0,"type":"rectangle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[195.0,240.0,225.0,165.0],"ycors":[90.0,150.0,180.0,105.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[105.0,60.0,75.0,135.0],"ycors":[90.0,150.0,180.0,105.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"plant":{"rotate":false,"elements":[{"xmin":135.0,"ymin":90.0,"xmax":165.0,"ymax":300.0,"type":"rectangle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[135.0,90.0,45.0,75.0,135.0],"ycors":[255.0,210.0,195.0,255.0,285.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[165.0,210.0,255.0,225.0,165.0],"ycors":[255.0,210.0,195.0,255.0,285.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[135.0,90.0,45.0,75.0,135.0],"ycors":[180.0,135.0,120.0,180.0,210.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[165.0,165.0,225.0,255.0,210.0],"ycors":[180.0,210.0,180.0,120.0,135.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[135.0,90.0,45.0,75.0,135.0],"ycors":[105.0,60.0,45.0,105.0,135.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[165.0,165.0,225.0,255.0,210.0],"ycors":[105.0,135.0,105.0,45.0,60.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[135.0,120.0,150.0,180.0,165.0],"ycors":[90.0,45.0,15.0,45.0,90.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"square":{"rotate":false,"elements":[{"xmin":30.0,"ymin":30.0,"xmax":270.0,"ymax":270.0,"type":"rectangle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"square 2":{"rotate":false,"elements":[{"xmin":30.0,"ymin":30.0,"xmax":270.0,"ymax":270.0,"type":"rectangle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xmin":60.0,"ymin":60.0,"xmax":240.0,"ymax":240.0,"type":"rectangle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false}]},"star":{"rotate":false,"elements":[{"xcors":[151.0,185.0,298.0,207.0,242.0,151.0,59.0,94.0,3.0,116.0],"ycors":[1.0,108.0,108.0,175.0,282.0,216.0,282.0,175.0,108.0,108.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"target":{"rotate":false,"elements":[{"x":0.0,"y":0.0,"diam":300.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":30.0,"y":30.0,"diam":240.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"x":60.0,"y":60.0,"diam":180.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":90.0,"y":90.0,"diam":120.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"x":120.0,"y":120.0,"diam":60.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"tree":{"rotate":false,"elements":[{"x":118.0,"y":3.0,"diam":94.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xmin":120.0,"ymin":195.0,"xmax":180.0,"ymax":300.0,"type":"rectangle","color":"rgba(157, 110, 72, 1.0)","filled":true,"marked":false},{"x":65.0,"y":21.0,"diam":108.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":116.0,"y":41.0,"diam":127.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":45.0,"y":90.0,"diam":120.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":104.0,"y":74.0,"diam":152.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"triangle":{"rotate":false,"elements":[{"xcors":[150.0,15.0,285.0],"ycors":[30.0,255.0,255.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"triangle 2":{"rotate":false,"elements":[{"xcors":[150.0,15.0,285.0],"ycors":[30.0,255.0,255.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[151.0,225.0,75.0],"ycors":[99.0,223.0,224.0],"type":"polygon","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false}]},"truck":{"rotate":false,"elements":[{"xmin":4.0,"ymin":45.0,"xmax":195.0,"ymax":187.0,"type":"rectangle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[296.0,296.0,259.0,244.0,208.0,207.0],"ycors":[193.0,150.0,134.0,104.0,104.0,194.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xmin":195.0,"ymin":60.0,"xmax":195.0,"ymax":105.0,"type":"rectangle","color":"rgba(255, 255, 255, 1.0)","filled":true,"marked":false},{"xcors":[238.0,252.0,219.0,218.0],"ycors":[112.0,141.0,141.0,112.0],"type":"polygon","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"x":234.0,"y":174.0,"diam":42.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"xmin":181.0,"ymin":185.0,"xmax":214.0,"ymax":194.0,"type":"rectangle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":144.0,"y":174.0,"diam":42.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"x":24.0,"y":174.0,"diam":42.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"x":24.0,"y":174.0,"diam":42.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":false,"marked":true},{"x":144.0,"y":174.0,"diam":42.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":false,"marked":true},{"x":234.0,"y":174.0,"diam":42.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":false,"marked":true}]},"turtle":{"rotate":true,"elements":[{"xcors":[215.0,240.0,246.0,228.0,215.0,193.0],"ycors":[204.0,233.0,254.0,266.0,252.0,210.0],"type":"polygon","color":"rgba(89, 176, 60, 1.0)","filled":true,"marked":false},{"xcors":[195.0,225.0,245.0,260.0,269.0,261.0,240.0,225.0,210.0],"ycors":[90.0,75.0,75.0,89.0,108.0,124.0,105.0,105.0,105.0],"type":"polygon","color":"rgba(89, 176, 60, 1.0)","filled":true,"marked":false},{"xcors":[105.0,75.0,55.0,40.0,31.0,39.0,60.0,75.0,90.0],"ycors":[90.0,75.0,75.0,89.0,108.0,124.0,105.0,105.0,105.0],"type":"polygon","color":"rgba(89, 176, 60, 1.0)","filled":true,"marked":false},{"xcors":[132.0,134.0,107.0,108.0,150.0,192.0,192.0,169.0,172.0],"ycors":[85.0,64.0,51.0,17.0,2.0,18.0,52.0,65.0,87.0],"type":"polygon","color":"rgba(89, 176, 60, 1.0)","filled":true,"marked":false},{"xcors":[85.0,60.0,54.0,72.0,85.0,107.0],"ycors":[204.0,233.0,254.0,266.0,252.0,210.0],"type":"polygon","color":"rgba(89, 176, 60, 1.0)","filled":true,"marked":false},{"xcors":[119.0,179.0,209.0,224.0,220.0,175.0,128.0,81.0,74.0,88.0],"ycors":[75.0,75.0,101.0,135.0,225.0,261.0,261.0,224.0,135.0,99.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]},"wheel":{"rotate":false,"elements":[{"x":3.0,"y":3.0,"diam":294.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x":30.0,"y":30.0,"diam":240.0,"type":"circle","color":"rgba(0, 0, 0, 1.0)","filled":true,"marked":false},{"x1":150.0,"y1":285.0,"x2":150.0,"y2":15.0,"type":"line","color":"rgba(141, 141, 141, 1.0)","filled":false,"marked":true},{"x1":15.0,"y1":150.0,"x2":285.0,"y2":150.0,"type":"line","color":"rgba(141, 141, 141, 1.0)","filled":false,"marked":true},{"x":120.0,"y":120.0,"diam":60.0,"type":"circle","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"x1":216.0,"y1":40.0,"x2":79.0,"y2":269.0,"type":"line","color":"rgba(141, 141, 141, 1.0)","filled":false,"marked":true},{"x1":40.0,"y1":84.0,"x2":269.0,"y2":221.0,"type":"line","color":"rgba(141, 141, 141, 1.0)","filled":false,"marked":true},{"x1":40.0,"y1":216.0,"x2":269.0,"y2":79.0,"type":"line","color":"rgba(141, 141, 141, 1.0)","filled":false,"marked":true},{"x1":84.0,"y1":40.0,"x2":221.0,"y2":269.0,"type":"line","color":"rgba(141, 141, 141, 1.0)","filled":false,"marked":true}]},"x":{"rotate":false,"elements":[{"xcors":[270.0,225.0,30.0,75.0],"ycors":[75.0,30.0,225.0,270.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true},{"xcors":[30.0,75.0,270.0,225.0],"ycors":[75.0,30.0,225.0,270.0],"type":"polygon","color":"rgba(141, 141, 141, 1.0)","filled":true,"marked":true}]}}, {"default":{}}, 4);
function startup() {
  world.resetTicks();
  world.clearAll();
  showStartScreen();
  Globals.setGlobal(18, true);
  Globals.setGlobal(23, false);
  Globals.setGlobal(22, false);
  Globals.setGlobal(19, false);
  Globals.setGlobal(24, false);
}
function showStartScreen() {
  AgentSet.ask(world.createTurtles(1, "DOTS"), true, function() {
    Prims.setXY(10, (0.6 * world.maxPycor));
    AgentSet.setTurtleVariable(7, 15);
    AgentSet.setTurtleVariable(10, 0.1);
    AgentSet.setTurtleVariable(6, "Click the On/Off button to turn on this application.");
  });
  AgentSet.ask(world.createTurtles(1, "DOTS"), true, function() {
    Prims.setXY(4, (0.5 * world.maxPycor));
    AgentSet.setTurtleVariable(7, 15);
    AgentSet.setTurtleVariable(10, 0.1);
    AgentSet.setTurtleVariable(6, "Leave it on all the time.");
  });
  AgentSet.ask(world.createTurtles(1, "DOTS"), true, function() {
    Prims.setXY(20, (0.3 * world.maxPycor));
    AgentSet.setTurtleVariable(7, 9.9);
    AgentSet.setTurtleVariable(10, 0.1);
    AgentSet.setTurtleVariable(6, "Note: this model will only run for 100 years.");
  });
  AgentSet.ask(world.createTurtles(1, "DOTS"), true, function() {
    Prims.setXY(20, (0.2 * world.maxPycor));
    AgentSet.setTurtleVariable(7, 9.9);
    AgentSet.setTurtleVariable(10, 0.1);
    AgentSet.setTurtleVariable(6, "It is not accurate for longer times.");
  });
  AgentSet.ask(world.createTurtles(1, "DOTS"), true, function() {
    Prims.setXY((0.5 * world.minPxcor), (0.7 * world.maxPycor));
    AgentSet.setTurtleVariable(1, 15);
    AgentSet.setTurtleVariable(11, 3);
    AgentSet.setTurtleVariable(10, 2);
    AgentSet.setTurtleVariable(2, 315);
    noop();
  });
  var i = 0;
  while ((i < 50)) {
    AgentSet.ask(AgentSet.agentFilter(world.turtlesOfBreed("DOTS"), function() {
      return Prims.equality(AgentSet.getTurtleVariable(2), 315)
    }), true, function() {
      Prims.fd(0.1);
    });
    i = (i + 1);
  }
}
function on_off() {
  if (Globals.getGlobal(18)) {
    world.clearAll();
    Globals.setGlobal(18, false);
    initialize();
    initializeVariables();
  }
  noop(0.2);
  if (Globals.getGlobal(19)) {
    AgentSet.ask(world.turtlesOfBreed("CLOUDS"), true, function() {
      Prims.fd((0.03 * (0.1 + ((3 + AgentSet.getBreedVariable("CLOUD-NUM")) / 10))));
    });
    runSunshine();
    runHeat();
    runIr();
    runCo2();
    reportTemperatures();
    if ((Globals.getGlobal(8) >= ((Globals.getGlobal(10) + Globals.getGlobal(21)) - 0.1))) {
      Globals.setGlobal(19, false);
      updateDataSeries();
    }
    Globals.setGlobal(8, (Globals.getGlobal(8) + Globals.getGlobal(12)));
    Globals.setGlobal(22, true);
    world.tick();
  }
}
function runModel() {
  if ((!(Globals.getGlobal(23)) && !(Globals.getGlobal(18)))) {
    Globals.setGlobal(19, true);
    logUserAction("User started the model.");
  }
}
function stopModel() {
  Globals.setGlobal(19, false);
}
function analyzeData() {
  if (Globals.getGlobal(22)) {
    Globals.setGlobal(23, true);
    if (Globals.getGlobal(19)) {
      stopModel();
      updateDataSeries();
    }
    updateRunSeries();
    Globals.setGlobal(22, false);
    if (Globals.getGlobal(24)) {
      clear();
      Globals.setGlobal(24, false);
    }
    openCODAPTable();
    logUserAction("User exported the model.");
    if(Global.getGlobal(10) < 2114) {
      logUserAction("User analyzed data before end of a run.");
    }
  }
}
function clearData() {
  logUserAction("User set up a new run.");
  if (!(Globals.getGlobal(18))) {
    stopModel();
    if (!(Globals.getGlobal(22))) {
      clearCODAPData();
      clearPlots();
      clear();
    }
    if (Globals.getGlobal(22)) {
      var ans = confirm("Lose current data and set up new run?");
      if (Prims.equality(ans, false)) {
        Globals.setGlobal(24, true);
        analyzeData();
      }
      if (Prims.equality(ans, true)) {
        $("#dialog").show();
        Globals.setGlobal(16, "");
        clearCODAPData();
        clearPlots();
        clear();
      }
    }
  }
}
function clear() {
  noop();
  noop(Globals.getGlobal(10), (Globals.getGlobal(10) + Globals.getGlobal(21)));
  noop();
  setupStartingConditions();
  Globals.setGlobal(8, Globals.getGlobal(10));
  Globals.setGlobal(22, false);
  Globals.setGlobal(23, false);
  noop();
  Globals.setGlobal(9, Globals.getGlobal(10));
}
function actOnChanges() {
  if (!Prims.equality(Globals.getGlobal(26), Globals.getGlobal(1))) {
    AgentSet.ask(world.patches(), true, function() {
      updateAlbedo();
    });
    Prims.clearOutput();
    Prims.outputPrint("Albedo is the fraction of sunlight that is reflected.");
    Prims.outputPrint("Ice has albedo near 1. Forests and oceans are near 0.");
    Globals.setGlobal(26, Globals.getGlobal(1));
  }
  if (!Prims.equality(Globals.getGlobal(28), Globals.getGlobal(2))) {
    setCo2(StrictMath.round((0.1 * Globals.getGlobal(2))));
    Prims.clearOutput();
    Prims.outputPrint("The CO2 level in 2013 was 400 ppm (ppm = parts per million.)");
    Prims.outputPrint("It could reach 1000 ppm by 2114.");
    Globals.setGlobal(28, Globals.getGlobal(2));
  }
  if (!Prims.equality(Globals.getGlobal(27), Globals.getGlobal(3))) {
    setClouds(Globals.getGlobal(3));
    Prims.clearOutput();
    Prims.outputPrint("The number of clouds in this model.");
    Globals.setGlobal(27, Globals.getGlobal(3));
  }
  if (!Prims.equality(Globals.getGlobal(25), Globals.getGlobal(0))) {
    Prims.clearOutput();
    Prims.outputPrint("The sun brightness is a percent of the average brightness.");
    Prims.outputPrint("The usual value is between 97% and 103%.");
    Globals.setGlobal(25, Globals.getGlobal(0));
  }
}
function initialize() {
  AgentSet.ask(world.turtlesOfBreed("ICONS"), true, function() {
    AgentSet.die();
  });
  setupWorld();
  setupStartingConditions();
  setCo2(40);
  setClouds(5);
  Globals.setGlobal(13, 30);
  Globals.setGlobal(12, (1 / Globals.getGlobal(13)));
  Globals.setGlobal(14, (Globals.getGlobal(12) / 10));
  Globals.setGlobal(15, (1 - Globals.getGlobal(14)));
  Globals.setGlobal(17, AgentSet.count(world.turtlesOfBreed("HEAT")));
  Globals.setGlobal(18, false);
  Globals.setGlobal(19, false);
  Globals.setGlobal(20, false);
  Globals.setGlobal(23, false);
  setupDataExport();
  world.resetTicks();
}
function setupStartingConditions() {
  AgentSet.ask(world.turtlesOfBreed("SUNRAYS"), true, function() {
    AgentSet.die();
  });
  initializeSunrays(12, 25);
  AgentSet.ask(world.turtlesOfBreed("HEAT"), true, function() {
    AgentSet.die();
  });
  initializeHeat(500);
  Globals.setGlobal(6, 14);
  Globals.setGlobal(11, Globals.getGlobal(6));
}
function initializeVariables() {
  Globals.setGlobal(10, 2014);
  Globals.setGlobal(8, Globals.getGlobal(10));
  Globals.setGlobal(9, 0);
  Globals.setGlobal(21, 70);
  noop(Globals.getGlobal(10), (Globals.getGlobal(10) + Globals.getGlobal(21)));
  noop();
  Globals.setGlobal(0, 100);
  Globals.setGlobal(25, Globals.getGlobal(0));
  Globals.setGlobal(1, 0.33);
  Globals.setGlobal(26, Globals.getGlobal(1));
  Globals.setGlobal(3, 5);
  Globals.setGlobal(27, Globals.getGlobal(3));
  Globals.setGlobal(2, 400);
  Globals.setGlobal(28, Globals.getGlobal(2));
  Globals.setGlobal(22, false);
  Globals.setGlobal(24, false);
}
function updateAlbedo() {
  if (Prims.equality(AgentSet.getPatchVariable(1), Globals.getGlobal(5))) {
    AgentSet.setPatchVariable(2, (50 + (9 * Globals.getGlobal(1))));
  }
}
function setupWorld() {
  Globals.setGlobal(4, (world.maxPycor - 5));
  Globals.setGlobal(5, (world.minPycor + 8));
  AgentSet.ask(world.patches(), true, function() {
    if (Prims.equality(AgentSet.getPatchVariable(1), world.maxPycor)) {
      AgentSet.setPatchVariable(2, 0);
    }
    if (((AgentSet.getPatchVariable(1) < world.maxPycor) && (AgentSet.getPatchVariable(1) > Globals.getGlobal(4)))) {
      AgentSet.setPatchVariable(2, (9 - Prims.scaleColor(9.9, AgentSet.getPatchVariable(1), Globals.getGlobal(4), world.maxPycor)));
    }
    if (((AgentSet.getPatchVariable(1) <= Globals.getGlobal(4)) && (AgentSet.getPatchVariable(1) > Globals.getGlobal(5)))) {
      AgentSet.setPatchVariable(2, (105 + ((2 * (AgentSet.getPatchVariable(1) + world.maxPycor)) / world.maxPycor)));
    }
    if ((AgentSet.getPatchVariable(1) < Globals.getGlobal(5))) {
      AgentSet.setPatchVariable(2, (15 + 3));
    }
    updateAlbedo();
  });
  showLegend();
}
function showLegend() {
  var iconY = (world.maxPycor - 0.7);
  var x1 = 0;
  var x2 = 0;
  var x3 = 0;
  var x4 = 0;
  AgentSet.ask(world.createTurtles(1, "ICONS"), true, function() {
    AgentSet.setTurtleVariable(1, 45);
    AgentSet.setTurtleVariable(2, 90);
    x1 = (world.minPxcor + 1);
    Prims.setXY(x1, iconY);
  });
  AgentSet.ask(world.createTurtles(1, "ICONS"), true, function() {
    AgentSet.setTurtleVariable(1, 0);
    Prims.setXY((x1 + 4), (iconY + 0.65));
    AgentSet.setTurtleVariable(6, "Sunray");
  });
  AgentSet.ask(world.createTurtles(1, "ICONS"), true, function() {
    AgentSet.setTurtleVariable(1, 15);
    x2 = (world.minPxcor + 14);
    Prims.setXY(x2, iconY);
    AgentSet.setTurtleVariable(5, "dot");
  });
  AgentSet.ask(world.createTurtles(1, "ICONS"), true, function() {
    AgentSet.setTurtleVariable(1, 0);
    Prims.setXY((x2 + 6), (iconY + 0.65));
    AgentSet.setTurtleVariable(6, "Heat packet");
  });
  AgentSet.ask(world.createTurtles(1, "ICONS"), true, function() {
    AgentSet.setTurtleVariable(1, 125);
    AgentSet.setTurtleVariable(2, 90);
    x3 = (world.minPxcor + 27);
    Prims.setXY(x3, iconY);
  });
  AgentSet.ask(world.createTurtles(1, "ICONS"), true, function() {
    AgentSet.setTurtleVariable(1, 0);
    Prims.setXY((x3 + 8), (iconY + 0.65));
    AgentSet.setTurtleVariable(6, "Heat radiation");
  });
  AgentSet.ask(world.createTurtles(1, "ICONS"), true, function() {
    AgentSet.setTurtleVariable(1, 55);
    AgentSet.setTurtleVariable(5, "molecule water");
    x4 = (world.minPxcor + 40);
    Prims.setXY((x4 - 0.5), iconY);
  });
  AgentSet.ask(world.createTurtles(1, "ICONS"), true, function() {
    AgentSet.setTurtleVariable(1, 0);
    Prims.setXY((x4 + 7), (iconY + 0.65));
    AgentSet.setTurtleVariable(6, "CO2 molecule");
  });
  AgentSet.ask(world.turtlesOfBreed("ICONS"), true, function() {
    AgentSet.setTurtleVariable(10, 2);
  });
}
function runSunshine() {
  AgentSet.ask(world.turtlesOfBreed("SUNRAYS"), true, function() {
    Prims.fd(0.3);
    if ((AgentSet.getTurtleVariable(4) >= world.maxPycor)) {
      AgentSet.die();
    }
  });
  createSunshine();
  reflectSunraysFromClouds();
  encounterEarth();
}
function createSunshine() {
  if ((Prims.randomFloat(100) < (0.2 * Globals.getGlobal(0)))) {
    Prims.repeat(2, function() {
      AgentSet.ask(world.createTurtles(1, "SUNRAYS"), true, function() {
        AgentSet.setTurtleVariable(2, 160);
        AgentSet.setTurtleVariable(1, 45);
        AgentSet.setTurtleVariable(3, randomBetween(world.minPxcor, world.maxPxcor));
        AgentSet.setTurtleVariable(4, (world.maxPycor - 1));
      });
    });
  }
}
function reflectSunraysFromCloudsOld() {
  AgentSet.ask(world.turtlesOfBreed("SUNRAYS"), true, function() {
    if ((AgentSet.count(AgentSet.self().breedHere("CLOUDS")) > 0)) {
      AgentSet.setTurtleVariable(2, Prims.random(360));
    }
  });
}
function reflectSunraysFromClouds() {
  var bounce = (3 * Globals.getGlobal(3));
  AgentSet.ask(world.turtlesOfBreed("SUNRAYS"), true, function() {
    if ((Prims.random(1000) < bounce)) {
      AgentSet.setTurtleVariable(2, Prims.random(360));
    }
  });
}
function encounterEarth() {
  var percentAbsorbed = (100 * (1 - Globals.getGlobal(1)));
  AgentSet.ask(world.turtlesOfBreed("SUNRAYS"), true, function() {
    if ((AgentSet.getTurtleVariable(4) <= Globals.getGlobal(5))) {
      AgentSet.setTurtleVariable(2, 20);
      if ((Prims.randomFloat(100) < percentAbsorbed)) {
        AgentSet.setTurtleVariable(2, randomBetween(100, 260));
        AgentSet.setTurtleVariable(1, 15);
        AgentSet.setBreed(world.turtlesOfBreed("HEAT"));
        AgentSet.setTurtleVariable(5, "dot");
      }
    }
  });
}
function runHeat() {
  AgentSet.ask(world.turtlesOfBreed("HEAT"), true, function() {
    Prims.fd(0.075);
    if ((AgentSet.getTurtleVariable(4) <= world.minPycor)) {
      AgentSet.setTurtleVariable(2, randomBetween(-70, 70));
    }
    if ((AgentSet.getTurtleVariable(4) >= Globals.getGlobal(5))) {
      AgentSet.setTurtleVariable(2, randomBetween(135, 225));
      if ((Prims.randomFloat(100) < (20 + (2.5 * (Globals.getGlobal(6) - 15))))) {
        AgentSet.setBreed(world.turtlesOfBreed("IR"));
        AgentSet.setTurtleVariable(2, 20);
        AgentSet.setTurtleVariable(1, 125);
        AgentSet.setTurtleVariable(5, "default");
      }
    }
  });
}
function runIr() {
  AgentSet.ask(world.turtlesOfBreed("IR"), true, function() {
    Prims.fd(0.3);
    if ((AgentSet.getTurtleVariable(4) >= world.maxPycor)) {
      AgentSet.die();
    }
    if ((AgentSet.getTurtleVariable(4) <= Globals.getGlobal(5))) {
      AgentSet.setBreed(world.turtlesOfBreed("HEAT"));
      AgentSet.setTurtleVariable(2, randomBetween(95, 265));
      AgentSet.setTurtleVariable(1, 15);
      AgentSet.setTurtleVariable(5, "dot");
    }
    if ((AgentSet.count(AgentSet.self().breedHere("CO2")) > 0)) {
      AgentSet.setTurtleVariable(2, Prims.random(360));
    }
  });
}
function runCo2() {
  AgentSet.ask(world.turtlesOfBreed("CO2"), true, function() {
    AgentSet.setTurtleVariable(2, (AgentSet.getTurtleVariable(2) + randomBetween(-25, 25)));
    Prims.fd(randomBetween(0.05, 0.15));
    if ((AgentSet.getTurtleVariable(4) <= (Globals.getGlobal(5) + 1))) {
      AgentSet.setTurtleVariable(2, randomBetween(-45, 45));
    }
    if ((AgentSet.getTurtleVariable(4) >= Globals.getGlobal(4))) {
      AgentSet.setTurtleVariable(2, randomBetween(135, 225));
    }
  });
}
function reportTemperatures() {
  Globals.setGlobal(17, ((0.99 * Globals.getGlobal(17)) + (0.01 * AgentSet.count(world.turtlesOfBreed("HEAT")))));
  var currentTemperature = (14 + (0.05 * (Globals.getGlobal(17) - 500)));
  Globals.setGlobal(6, ((0.99 * Globals.getGlobal(6)) + (0.01 * currentTemperature)));
  Globals.setGlobal(11, ((Globals.getGlobal(15) * Globals.getGlobal(11)) + (Globals.getGlobal(14) * Globals.getGlobal(6))));
  if ((StrictMath.round(Globals.getGlobal(8)) > Globals.getGlobal(9))) {
    updatePlots()
    updateDataSeries();
    Globals.setGlobal(9, StrictMath.round(Globals.getGlobal(8)));
  }
}
function setClouds(n) {
  AgentSet.ask(world.turtlesOfBreed("CLOUDS"), true, function() {
    AgentSet.die();
  });
  var i = 0;
  Prims.repeat(n, function() {
    makeCloud(i, n);
    i = (i + 1);
  });
}
function makeCloud(k, n) {
  var width = (Globals.getGlobal(4) - Globals.getGlobal(5));
  var mid = ((Globals.getGlobal(4) + Globals.getGlobal(5)) / 2);
  var y = ((mid + (width * ((k / n) - 0.3))) - 2);
  if (Prims.equality(k, 0)) {
    y = 6;
  }
  var x = randomBetween(world.minPxcor, world.maxPxcor);
  Prims.repeat((3 + Prims.random(20)), function () {
    AgentSet.ask(world.createTurtles(1, "CLOUDS"), true, function() {
      AgentSet.setBreedVariable("CLOUD-NUM", k);
      Prims.setXY(((x + Prims.random(9)) - 4), (y + Prims.random(Prims.random(5))));
      AgentSet.setTurtleVariable(1, 9.9);
      AgentSet.setTurtleVariable(10, (2 + Prims.random(2)));
      AgentSet.setTurtleVariable(2, 90);
      AgentSet.setTurtleVariable(5, "cloud");
    });
  });
}
function setCo2(n) {
  AgentSet.ask(world.turtlesOfBreed("CO2"), true, function() {
    AgentSet.die();
  });
  Prims.repeat(n, function () {
    AgentSet.ask(world.createTurtles(1, "CO2"), true, function() {
      AgentSet.setTurtleVariable(1, 55);
      AgentSet.setTurtleVariable(5, "molecule water");
      Prims.setXY(randomBetween(world.minPxcor, world.maxPxcor), randomBetween(Globals.getGlobal(5), Globals.getGlobal(4)));
      AgentSet.setTurtleVariable(2, Prims.random(360));
    });
  });
}
function initializeSunrays(nUp, nDown) {
  Prims.repeat(nUp, function() {
    AgentSet.ask(world.createTurtles(1, "SUNRAYS"), true, function() {
      AgentSet.setTurtleVariable(2, 20);
      AgentSet.setTurtleVariable(1, 45);
      AgentSet.setTurtleVariable(3, randomBetween(world.minPxcor, world.maxPxcor));
      AgentSet.setTurtleVariable(4, randomBetween(Globals.getGlobal(5), Globals.getGlobal(4)));
    })
  });
  Prims.repeat(nDown, function() {
    AgentSet.ask(world.createTurtles(1, "SUNRAYS"), true, function() {
      AgentSet.setTurtleVariable(2, 160);
      AgentSet.setTurtleVariable(1, 45);
      AgentSet.setTurtleVariable(3, randomBetween(world.minPxcor, world.maxPxcor));
      AgentSet.setTurtleVariable(4, randomBetween(Globals.getGlobal(5), Globals.getGlobal(4)));
    });
  });
}
function initializeHeat(n) {
  Prims.repeat(n, function() {
    AgentSet.ask(world.createTurtles(1, "HEAT"), true, function() {
      AgentSet.setTurtleVariable(1, 15);
      AgentSet.setTurtleVariable(5, "dot");
      AgentSet.setTurtleVariable(4, randomBetween(world.minPycor, Globals.getGlobal(5)));
      AgentSet.setTurtleVariable(3, randomBetween(world.minPxcor, world.maxPxcor));
    });
  });
}
function randomBetween(a, b) {
  return (a + Prims.randomFloat((b - a)));
}
function setupDataExport() {
  var computationalInputs = [["CO2 Level", "ppm", 0, 1000, true], ["Sun Brightness", "%", 75, 125, true], ["Albedo", "", 0, 1, true], ["Cloud Amount", "", 0, 25, true]];
  var representationalInputs = [];
  var computationalOutputs = [["Year", "", 2014, 2114, true], ["Final Yearly Temp.", "°C", -100, 200, true], ["Final 10-year Avg. Temp.", "°C", -100, 200, true]];
  var studentInputs = [];
  var modelInformation = [["ramp", "Climate-post-test.v14.nlogo", "Dec 2013"]];
  var timeSeriesData = [["Year", "", 2014, 2114, true], ["Yearly Temp.", "°C", -100, 200, true], ["10-year Avg. Temp.", "°C", -100, 200, true]];
  var setup = Prims.list(computationalInputs, representationalInputs, computationalOutputs, studentInputs, modelInformation, timeSeriesData);
}
function updateRunSeries() {
  var computationalInputs = Prims.list(Globals.getGlobal(2), Globals.getGlobal(0), Globals.getGlobal(1), Globals.getGlobal(3));
  var representationalInputs = [];
  var computationalOutputs = Prims.list(StrictMath.round(Globals.getGlobal(8)), Prims.precision(Globals.getGlobal(6), 1), Prims.precision(Globals.getGlobal(11), 1));
  var studentInputs = [];
  var runSeriesData = Prims.list(computationalInputs, representationalInputs, computationalOutputs, studentInputs);
  record()
}
function createRunParameterList() {
  return Prims.list(Globals.getGlobal(2), Globals.getGlobal(0), Globals.getGlobal(1), Globals.getGlobal(3), StrictMath.round(Globals.getGlobal(8)), Prims.precision(Globals.getGlobal(6), 1), Prims.precision(Globals.getGlobal(11), 1));
}
function updateDataSeries() {
  yearlyData.push([StrictMath.round(Globals.getGlobal(8)), Prims.precision(Globals.getGlobal(6), 1), Prims.precision(Globals.getGlobal(11), 1)])
}
Globals.setGlobal(0, 100);
Globals.setGlobal(1, 0.33);
Globals.setGlobal(2, 400);
Globals.setGlobal(3, 5);
