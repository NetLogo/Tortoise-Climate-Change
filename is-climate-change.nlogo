; A simplified four parameter model of climate change
; Jan 27, 2014
; Copyright (c) 2014 the Concord Consortium
; Designed to be converted HTML5, which executes slower
; To speed up this version, I have reduce thed number of turtles and
;      replaced the clouds with uniform reflection.

breed [ clouds ]
breed [ sunrays sunray ]
breed [ IR ]
breed [ heat ]
breed [ CO2 ]
breed [dots dot]
breed [icons icon]  ; used in the legend

clouds-own [ cloud-num ]

globals [ 
  sky-top 
  earth-top 
  temperature  
  num-clouds
  year
  old-year
  start-year
  smooth-temperature
  time-step        ; the number of years advanced per tick
  steps-per-year
  alpha beta       ; used in smoothing the temperature

  ; globals used to export data to DataGames
;  data-pairs       ; saved annual year-temperature data
  other-reason

  count-heat
  starting-up?
;  run-data
  running?
  old-running?
  run-duration
  data-available?
  analyzing?
  new-run-reset?

  old-sun-brightness
  old-albedo
  old-cloud-amount
  old-CO2-level
  ]

to startup
  reset-ticks                    
  clear-all                 ; clear everything
  show-start-screen         ; the start screen asks the user to turn on the on/off button
  set starting-up? true
  set analyzing? false
  set data-available? false
  set running? false
  set new-run-reset? false
end 

to show-start-screen
  create-dots 1 [
    setxy 10 .6 * max-pycor 
    set label-color red
    set size .1
    set label "Click the On/Off button to turn on this application."]
  create-dots 1 [
    setxy 4 .5 * max-pycor 
    set label-color red
    set size .1
    set label "Leave it on all the time."]
  create-dots 1 [
    setxy 20 .3 * max-pycor 
    set label-color white
    set size .1
    set label "Note: this model will only run for 100 years."]
  create-dots 1 [
    setxy 20 .2 * max-pycor 
    set label-color white
    set size .1
    set label "It is not accurate for longer times."]
    
  create-dots 1 [
    setxy .5 * min-pxcor .7 * max-pycor 
    set color red set pen-size 3
    set size 2 set heading 315
    pd ]
  let i 0 
  while [i < 50][       ; draw the animated red arrow that points to the on/off button
    ask dots with [heading = 315]  [fd .1 ]
    set i i + 1 ]
end

to on_off    ; this is the main execution loop--a 'forever' loop
  if starting-up? [   ; executed only once the first time the on/off button is pressed
    clear-all
    set starting-up? false 
    initialize             ; initializes everything but only once after setup has set starting-up? true
    initialize-variables]   
  every .2 [  act-on-changes ]      ; checks for user actions and takes appropriate actions
  if running? [
    ask clouds [ fd .03 * (0.1 + (3 + cloud-num) / 10) ]  ; move clouds along
    run-sunshine    ;; moves the sunrays
    run-heat        ;; moves heat dots
    run-IR          ;; moves the IR arrowheads
    run-CO2         ;; moves CO2 molecules
    report-temperatures  ;; computes current and average temperatures
    if year >= (start-year + run-duration - .1)  [  ; the .1 stops auto-rescale
      set running? false

;;;;;; Data-export related
      update-data-series  ; make sure final value is in the data table
;;;;;; end export related

      ; may need a message here saying run end--that the run cannot exceed 100 years
      ]
    set year year + time-step
    set data-available? true
    tick ]
end

to run-model  ; this turns on running? so that the on/off loop executes the model
  if not analyzing? and not starting-up?[
    set running? true


  ]
end 

to stop-model 
  set running? false
end

;;;;;; Data-export related
to analyze-data ;
  if data-available? [    
    set analyzing? true
    if running? [
      stop-model
      update-data-series  ; make sure to caputure last value
    ]
    update-run-series
    set data-available? false
    if new-run-reset? [
      clear
      set new-run-reset? false
    ]
  ]
end
;;;;;; end export related

to clear-data
  if not starting-up? [
    stop-model
    if not data-available? [clear]
    if data-available? [
      let ans user-one-of 
        "Lose current data and set up new run?" 
        ["Yes. Discard current data." "No. Analyze the data, and set up new run."]
      if ans = "No. Analyze the data, and set up new run." [
        set new-run-reset? true

;;;;;; Data-export related
        analyze-data
;;;;;; end export related

      ]
      if ans = "Yes. Discard current data." [
        let options []
        let a1 "I'm just trying things out."  ; possible answers
        set options lput a1 options
        let a2 "The data looks strange."
        set options lput a2 options
        let a3 "I'm making adjustments before analyzing data."
        set options lput a3 options
        let a4 "Other" 
        set options lput a4 options
        let ans1 user-one-of "Why do you want to remove the data?" options
        set other-reason ""
        if ans1 = a4 [set other-reason user-input "Why do you want to remove the data?"]

        clear
      ]
    ]
  ]
end
      
to clear
;  initialize 
  clear-all-plots
  set-plot-x-range start-year (start-year + run-duration)
  auto-plot-on 
  setup-starting-conditions
  set year start-year
  set data-available? false
  set analyzing? false
  clear-output
  set old-year start-year

end

to act-on-changes   ; detects changes in the sliders and selector
  if old-albedo != albedo [
    ask patches [update-albedo]
    clear-output
    output-print "Albedo is the average fraction of sunlight that is reflected."
    output-print "Ice has albedo near 1. Forests and oceans have albedos near 0."
    set old-albedo albedo]


  if old-CO2-level != CO2-level [
    set-CO2 round (.1 * CO2-level) ; there are .1 CO2 molecules for each ppm 
    clear-output
    output-print "The CO2 level in 2013 was 400 ppm (ppm = parts per million.)"
    output-print "It could reach 1000 ppm by 2114"
    set old-CO2-level CO2-level]
    
    
  if old-cloud-amount != cloud-amount [
    set-clouds cloud-amount
    clear-output
    output-print "The cloud-amount is the number of clouds in this model"
    set old-cloud-amount cloud-amount]
  
  if old-sun-brightness != sun-brightness [
    clear-output
    output-print "The sun brightness is a percent of the average brighness."
    output-print "The usual value is between 97% and 103%."
    set old-sun-brightness sun-brightness]
end

to initialize
  ask icons [die]
  setup-world
  setup-starting-conditions  ; for heat rays, sunrays, and temperature
  set-CO2 40   ; start out with 40 CO2 molecules (representing 400ppm)
  set-clouds 5      ; start with 10 clouds
  set steps-per-year 30
  set time-step 1 / steps-per-year
  set alpha time-step / 10  ; the 1/alpha is the number of steps being averaged
  set beta 1 - alpha
  set count-heat count heat ; count-heat is a smoothed version of count heat
  set starting-up? false
  set running? false
  set old-running? false
  set analyzing? false


;;;;;; Data-export related
  setup-data-export    ;;; used to define the structure of the exported data
;;;;;; end export related
  
  reset-ticks
end

to setup-starting-conditions
  ask sunrays [die]         ; these are needed for re-initialization for a new run
  initialize-sunrays 12 25  ; start with 12 sunrays going up and 25 going down
  ask heat [die]
  initialize-heat 500       ; start with 500 heat agents  
  set temperature 14
  set smooth-temperature temperature
end

to initialize-variables         ; these are initialized only once, when the program starts
  set start-year 2014
  set year start-year
  set old-year 0;
  set run-duration 70
  set-plot-x-range start-year (start-year + run-duration)
  auto-plot-on 
  set sun-brightness 100
  set old-sun-brightness sun-brightness 
  set albedo .33
  set old-albedo albedo
  set cloud-amount 5
  set old-cloud-amount cloud-amount
  set CO2-level 400
  set old-CO2-level CO2-level
  set data-available? false
  set new-run-reset? false
end

to update-albedo      ; reads the albedo slider and sets the color of the earth top accordingly
    if (pycor = earth-top) [ set pcolor 50 + 9 * albedo ] ; sets shades of green from off-white (59) to black (50)
end       

to setup-world
  set sky-top (max-pycor - 5)
  set earth-top (min-pycor + 8)
  ask patches [                           ;; set colors of the world
      if (pycor = max-pycor) [ set pcolor black ]
      if (pycor < max-pycor) and (pycor > sky-top) [
        set pcolor 9 - scale-color white pycor sky-top max-pycor   ]
      if ((pycor <= sky-top) and (pycor > earth-top)) [
        set pcolor blue + 2 * (pycor + max-pycor) / max-pycor  ]
      if (pycor < earth-top) [ set pcolor red + 3 ]  
      update-albedo ] 
  show-legend
end   

to show-legend      ; puts legend across the top of the world
  let icon-y max-pycor - .7
  let x1 0 let x2 0 let x3 0 let x4 0
  create-icons 1 [   ; show a large sunray
    set color yellow
    set heading 90
    set x1 min-pxcor + 1
    setxy x1 icon-y]
  create-icons 1 [   ; attach a label
    set color black
    setxy x1 + 4 icon-y + .65
    set label "Sunray"]
    
  create-icons 1 [      ;show large heat packet
    set color red
    set x2 min-pxcor + 14
    setxy x2 icon-y
    set shape "dot"]
  create-icons 1 [   ; attach a label
    set color black
    setxy x2 + 6 icon-y + .65
    set label "Heat packet"]
  
  create-icons 1 [
    set color magenta
    set heading 90
    set x3 min-pxcor + 27
    setxy x3 icon-y]  
  create-icons 1 [   ; attach a label
    set color black
    setxy x3 + 8 icon-y + .65
    set label "Heat radiation"]
  
  create-icons 1 [
    set color green
    set shape "molecule water"
    set x4  min-pxcor + 40
    setxy x4 - .5 icon-y]
  create-icons 1 [   ; attach a label
    set color black
    setxy x4 + 7 icon-y + .65
    set label "CO2 molecule"]
  ask icons [ set size 2]
end   

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;; Rules for the main actors ;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

to run-sunshine
  ask sunrays [               ; the following applies to all sunrays
     forward .3               ; move sunrays forward .3 units
     if ycor >= max-pycor  [
        die ] ]               ; kill rays leaving upward
  create-sunshine             ; start new sun rays from top
  reflect-sunrays-from-clouds ; check for reflection off clouds
  encounter-earth             ; check for reflection off earth and absorption
end

to create-sunshine
  if random-float 100 <  (.2 * sun-brightness ) [   ; create two new sunrays 20% of the time that this procedure is called, 
    ; for a brightness of 100, but increase this probability in proportion to the sun's brightness
    repeat 2 [ 
      create-sunrays 1 [
        set heading 160
        set color yellow
        set xcor random-between min-pxcor max-pxcor
        set ycor max-pycor - 1 ]]] 
end
 
to reflect-sunrays-from-clouds-old
  ask sunrays [
    if (count clouds-here > 0 ) [   ; if sunray shares patch with a cloud
      set heading random 360 ]]  ; send the sunray off in a random direction
end 

to reflect-sunrays-from-clouds  ; this version takes into account the number of clouds, but is smoother
  let bounce 3 * cloud-amount
  ask sunrays [
    if (random 1000) < bounce [
      set heading random 360 ]]
end

to encounter-earth                  ; this controls what happens when a sunray hits the earth
  let percent-absorbed 100 * (1 - albedo)  ; if albedo is 1 it is white and absorption is zero
        ; if albedo is 1 it is black and absrobtion is 100%
  ask sunrays [
    if (ycor <= earth-top) [        ; if the sunray encounters the earth
      set heading 20                ; head upward
      if random-float 100 < percent-absorbed [        ; but with a probability that depends on albedo
        set heading random-between 100 260    ; morph into heat energy
        set color 15  
        set breed heat    
        set shape "dot"  ]]]
end

to run-heat    ;; advances the heat energy turtles
  ask heat [    ; apply the following to every heat agent
    forward .075
    if (ycor <= min-pycor )[
      set heading random-between -70 70 ] ; if heading into the earth's core, bounce
    if (ycor >= earth-top ) [             ; if heading into sky at earth top
      set heading random-between 135 225  ; return heat to earth
      if random-float 100 < 20 + 2.5 * ( temperature - 15) [
        set breed IR
        set heading 20
        set color magenta 
        set shape "default" ]]]         
end 

to run-IR
  ask IR [                            ; apply the following to each IR agent
    forward .3
    if (ycor >= max-pycor ) [ die ]   ; if the IR reaches the top, it vanishes
    if (ycor <= earth-top ) [         ; if it encounters the earth, convert to heat 
      set breed heat
      set heading random-between 95 265
      set color red 
      set shape "dot" ]
    if (count CO2-here > 0)            ; if it collides with a CO2
      [ set heading random 360 ]]      ; head off in a random direction
end

to run-CO2
  ask CO2 [
    set heading heading + random-between -25 25 ; turn a bit
    fd random-between .05 .15                   ; move forward a bit
    if (ycor <= earth-top + 1) [                ; if it gets near the earth-top
      set heading random-between -45 45 ]       ; bounce off earth
    if (ycor >= sky-top) [                      ; if it gets near the sky top
      set heading random-between 135 225] ]     ; head downward
end

to report-temperatures
  set count-heat .99 * count-heat + .01 * count heat ; smooth out the heat count
  let current-temperature (14 + .05 * ((count-heat) - 500))  ; the temperature is related to the number of heat turtles
     ; there are about 500 heat agents with default conditions so the 14 ensures that this has a temperature of 14
     ; the .05 was found to ensure that doubling the CO2 adds 2-3 degrees to the temperature, which is a concensus range
  set temperature .99 * temperature + .01 * current-temperature ; running average over 100 values
  set smooth-temperature beta * smooth-temperature + alpha * temperature  ; running average of that. 
  update-plots  ; give time for the transients to settle down

;;;;;; Data-export related
  if (round year) > old-year [
    update-data-series
    set old-year round year
  ]
;;;;;; end export related

end

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;; support sliders  ;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

to set-clouds [ n ] 
  ask clouds [ die ]
  let i 0
  repeat n
     [ make-cloud  i n
     set i i + 1]
end

to make-cloud [ k n ]                   ;; makes cloud number k out of n total
  let width sky-top - earth-top
  let mid ( sky-top + earth-top ) / 2
  let y mid + width * ((k / n) - 0.3 ) - 2  ;; the ratio k/n determines its altitude
  if k = 0 [set y 6 ]
  let x random-between min-pxcor max-pxcor 
  repeat 3 + random 20 [ create-clouds 1 [ ;; lots of turtles make up a cloud
    set cloud-num k
    setxy x + (random 9) - 4 y + random random 5
    set color white
    set size 2 + random 2
    set heading 90 
    set shape "cloud" ]]
end

to set-CO2 [n]  ;; creates N CO2 molecules in atmosphere
    ask CO2 [die]
    repeat n [
      create-CO2 1 [
        set color green
        set shape "molecule water"
        setxy (random-between min-pxcor max-pxcor) (random-between earth-top sky-top)
        set heading random 360 ]] ;; heading is used to spin molecule  
end

to initialize-sunrays [n-up n-down]  ; populates the sky with sunrays 
  repeat n-up [
    create-sunrays 1 [
      set heading 20
      set color yellow
      set xcor random-between min-pxcor max-pxcor
      set ycor random-between earth-top sky-top ]] 
  repeat n-down [
    create-sunrays 1 [
      set heading 160
      set color yellow
      set xcor random-between min-pxcor max-pxcor
      set ycor random-between earth-top sky-top ]] 
end

to initialize-heat [n]
  repeat n [
    create-heat 1 [      
      set color red
      set shape "dot"
      set ycor random-between min-pycor earth-top 
      set xcor random-between min-pxcor max-pxcor]]
end

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;; helpful routine ;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

to-report random-between [a b]  ; reports a random floating number n such that a<=n<=b
  report a + random-float (b - a)
end


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;  Data export  ;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;;;;; Data-export related
to setup-data-export
  let computational-inputs [       ; students can adjust
    [ "CO2 Level" "ppm" 0 1000 true ]
    [ "Sun Brightness" "%" 75 125 true ]
    [ "Albedo" "" 0 1 true]
    [ "Cloud Amount" "" 0 25 true]]
  let representational-inputs [ ]  ; student analysis of run
  let computational-outputs [      ; calculated
    [ "Year" "" 2014 2114 true ]
    [ "Final Yearly Temp." "�C" -100 200 true ]
    [ "Final 10-year Avg. Temp." "�C" -100 200 true]]
  let student-inputs [ ]           ; other student actions during analysis
  let model-information [          ; 
    [ "ramp" "Climate-post-test.v14.nlogo" "Dec 2013" ] ]
  let time-series-data [
    [ "Year" "" 2014 2114 true ]
    [ "Yearly Temp." "�C" -100 200 true ]
    [ "10-year Avg. Temp." "�C" -100 200 true]
  ]
  let setup (list computational-inputs representational-inputs computational-outputs student-inputs model-information time-series-data)
end


;;;
;;; update-run-series 
;;;    call once at the end of a run
;;;    pass in any needed values as arguments if they are not accessible as global variables
;;;

to update-run-series    
  let computational-inputs     ( list CO2-level sun-brightness albedo cloud-amount ) 
  let representational-inputs []
  let computational-outputs   ( list round year precision temperature 1 precision smooth-temperature 1 )
  let student-inputs          []
  let run-series-data ( list computational-inputs representational-inputs computational-outputs student-inputs )
end

to-report create-run-parameter-list
  report (list CO2-level sun-brightness albedo cloud-amount round year precision temperature 1 precision smooth-temperature 1)
end


;;; update-data-series [ data-series ]
;;;    call once at the end of a tick
;;;    data series is a list: [time distance height speed] generated each time the display is updated
;;;    pump 
;;;    pass in any needed values as arguments if they are not global variables
;;;

to update-data-series 
end
;;;;;; end export related
@#$#@#$#@
GRAPHICS-WINDOW
4
18
559
393
24
15
11.12245
1
12
1
1
1
0
1
0
1
-24
24
-15
15
0
0
1
ticks
1.0

BUTTON
4
10
145
44
On/Off
on_off
T
1
T
OBSERVER
NIL
NIL
NIL
NIL
1

SLIDER
143
393
279
426
Sun-brightness
Sun-brightness
75
125
100
1
1
%
HORIZONTAL

SLIDER
279
393
419
426
Albedo
Albedo
0
1
0.33
0.01
1
NIL
HORIZONTAL

PLOT
558
76
828
434
Global Temperature
NIL
NIL
2000.0
2100.0
10.0
20.0
true
false
"" ""
PENS
"default" 1.0 0 -2674135 true "" "plotxy year temperature"
"avg" 1.0 0 -16448764 true "" "plotxy year precision Smooth-temperature 1"

MONITOR
557
436
637
481
Temperature 
word precision Temperature 1 \" C\"
1
1
11

MONITOR
771
436
828
481
Year
Year
0
1
11

MONITOR
634
436
770
481
10 year average temp.
(word \"         \" precision Smooth-temperature 1 \" C\")
17
1
11

SLIDER
4
393
144
426
CO2-level
CO2-level
0
1000
620
10
1
ppm
HORIZONTAL

SLIDER
419
393
559
426
Cloud-amount
Cloud-amount
0
25
5
1
1
NIL
HORIZONTAL

BUTTON
692
42
816
75
New Run
Clear-data
NIL
1
T
OBSERVER
NIL
NIL
NIL
NIL
1

BUTTON
569
10
693
43
Start
Run-model
NIL
1
T
OBSERVER
NIL
NIL
NIL
NIL
1

BUTTON
692
10
816
43
Stop
Stop-model
NIL
1
T
OBSERVER
NIL
NIL
NIL
NIL
1

BUTTON
569
42
693
75
Analyze Data
analyze-data
NIL
1
T
OBSERVER
NIL
NIL
NIL
NIL
1

OUTPUT
5
427
557
481
14

TEXTBOX
582
374
748
426
Red: current temperature\nBlack: average temperature\n  (over the last 10 years)
10
0.0
1

TEXTBOX
532
24
554
43
NIL
11
6.0
0

@#$#@#$#@
## WHAT IS IT?

This is a model of energy flow in the earth. It shows the earth as rose colored. On the earth surface is a green strip. Above that is a blue atmosphere and black space at the top. Clouds and CO2 molecules can be added to the atmosphere. The CO2 molecules represent greenhouse gasses that block infrared light that the earth emits. 

## HOW IT WORKS

Yellow arrowheads stream downward representing sunlight energy. Some of the sunlight reflects off clouds and more can reflect off the earth surface. 

If sunlight is absorbed by the earth, it turns into a red dot, representing heat energy. Each dot represents the energy of one yellow sunlight arrowhead. The red dots randomly move around the earth. The temperature of the earth is related to the total number of red dots. 

Sometimes the red dots transform into infrared (IR) light that heads toward space, carrying off energy. The probability of a red dot becoming IR light depends on the earth temperature. When the earth is cold, few red dots cause IR light; when it is hot, most do. The IR energy is represented by a magenta arrowhead. Each carries the same energy as a yellow arrowhead and as a red dot. The IR light goes through clouds but can bounce off CO2 molecules. 

## HOW TO USE IT

The "sun-brightness" slider controls how much sun energy enters the earth atmosphere. A value of 1.0 corresponds to our sun. Higher values allow you to see what would happen if the earth was closer to the sun, or if the sun got brighter. 

The "albedo" slider controls how much of the sun energy hitting the earth is absorbed.   
If the albedo is 1.0, the earth reflects all sunlight. This could happen if the earth froze and is indicated by a white surface. If the albedo is zero, the earth absorbs all sunlight. This is indicated as a black surface. The earth's albedo is about 0.6. 

You can add and remove clouds with buttons. Clouds block sunlight but not IR. 

You can add and remove greenhouse gasses, represented as CO2 molecules. CO2 blocks IR light but not sunlight. The buttons add and subtract molecules in groups of 25 up to 150.

The temperature of the earth is related to the amount of heat in the earth. The more red dots you see, the hotter it is. 

## THINGS TO NOTICE

Follow a single sunlight arrowhead. This easier if you slow down the model using the slider at the top of the model. 

Here is a better way to follow an arrowhead. Stop the model and control-click on an arrowhead, select the last item "turle" followed by a number. This opens a sub-menu where you can select "watch" followed by a number. Now when you run the model, you will see a circle around that arrowhead. 

What happens to the arrowhead when it hits the earth? Describe its later path. Does it escape the earth? What happens then? Do all arrowheads follow similar paths? 

## THINGS TO TRY

1. Play with model. Change the albedo and run the model.   
Add clouds and CO2 to the model and then watch a single sunlight arrowhead.   
What is the highest earth temperature you can produce? 

2. Run the model with a bright sun but no clouds and no CO2. What happens to the temperature? It should rise quickly and then settle down around 50 degrees. Why does it stop rising? Why does the temperatuer continue to bounce around? Remember, the temperature reflects the number of red dots in the earth. When the temperature is constant, there about as many incoming yellow arrowheads as outgoing IR ones. Why? 

3. Explore the effect of albedo holding everything else constant. Does increasing the albedo increase or decrease the earth temperature? When you experiment, be sure to run the model long enough for the temperature to settle down. 

4. Explore the effect of clouds holding everything else constant. 

5. Explore the effect of adding 100 CO2 molecules. What is the cause of the change you observe. Follow one sunlight arrowhead now. 

## DETAILS ABOUT THE MODEL

There is a relation between the number of red dots in the earth and the temperature of the earth. This is because the earth temperature goes up as the total thermal energy is increased. Thermal energy is added by sunlight that reaches the earth as well as from infrared (IR) light reflected down to the earth. Thermal energy is removed by IR emitted by the earth. The balance of these determines the energy in the earth with is proportional to its temperature. 

There are, of course, many simplifications in this model. The earth is not a single temperature, does not have a single albedo, and does not have a single heat capacity. Visible light is somewhat absorbed by CO2 and some IR light does bounce off clouds. No model is completely accurate. What is important, is that a model react in some ways like the system it is supposed to model. This model does that, showing how the greenhouse effect is caused by CO2 and other gases that absorb IR. 

## CREDITS AND REFERENCES

Created Nov 19, 2005 by Robert Tinker for the TELS project. Updated Jan 9, 2006. 
@#$#@#$#@
default
true
0
Polygon -7500403 true true 150 5 40 250 150 205 260 250

airplane
true
0
Polygon -7500403 true true 150 0 135 15 120 60 120 105 15 165 15 195 120 180 135 240 105 270 120 285 150 270 180 285 210 270 165 240 180 180 285 195 285 165 180 105 180 60 165 15

arrow
true
0
Polygon -7500403 true true 150 0 0 150 105 150 105 293 195 293 195 150 300 150

box
false
0
Polygon -7500403 true true 150 285 285 225 285 75 150 135
Polygon -7500403 true true 150 135 15 75 150 15 285 75
Polygon -7500403 true true 15 75 15 225 150 285 150 135
Line -16777216 false 150 285 150 135
Line -16777216 false 150 135 15 75
Line -16777216 false 150 135 285 75

bug
true
0
Circle -7500403 true true 96 182 108
Circle -7500403 true true 110 127 80
Circle -7500403 true true 110 75 80
Line -7500403 true 150 100 80 30
Line -7500403 true 150 100 220 30

butterfly
true
0
Polygon -7500403 true true 150 165 209 199 225 225 225 255 195 270 165 255 150 240
Polygon -7500403 true true 150 165 89 198 75 225 75 255 105 270 135 255 150 240
Polygon -7500403 true true 139 148 100 105 55 90 25 90 10 105 10 135 25 180 40 195 85 194 139 163
Polygon -7500403 true true 162 150 200 105 245 90 275 90 290 105 290 135 275 180 260 195 215 195 162 165
Polygon -16777216 true false 150 255 135 225 120 150 135 120 150 105 165 120 180 150 165 225
Circle -16777216 true false 135 90 30
Line -16777216 false 150 105 195 60
Line -16777216 false 150 105 105 60

car
false
0
Polygon -7500403 true true 300 180 279 164 261 144 240 135 226 132 213 106 203 84 185 63 159 50 135 50 75 60 0 150 0 165 0 225 300 225 300 180
Circle -16777216 true false 180 180 90
Circle -16777216 true false 30 180 90
Polygon -16777216 true false 162 80 132 78 134 135 209 135 194 105 189 96 180 89
Circle -7500403 true true 47 195 58
Circle -7500403 true true 195 195 58

circle
false
0
Circle -7500403 true true 0 0 300

circle 2
false
0
Circle -7500403 true true 0 0 300
Circle -16777216 true false 30 30 240

cloud
false
0
Circle -7500403 true true 13 118 94
Circle -7500403 true true 86 101 127
Circle -7500403 true true 51 51 108
Circle -7500403 true true 118 43 95
Circle -7500403 true true 158 68 134

cow
false
0
Polygon -7500403 true true 200 193 197 249 179 249 177 196 166 187 140 189 93 191 78 179 72 211 49 209 48 181 37 149 25 120 25 89 45 72 103 84 179 75 198 76 252 64 272 81 293 103 285 121 255 121 242 118 224 167
Polygon -7500403 true true 73 210 86 251 62 249 48 208
Polygon -7500403 true true 25 114 16 195 9 204 23 213 25 200 39 123

cylinder
false
0
Circle -7500403 true true 0 0 300

dot
false
0
Circle -7500403 true true 90 90 120

face happy
false
0
Circle -7500403 true true 8 8 285
Circle -16777216 true false 60 75 60
Circle -16777216 true false 180 75 60
Polygon -16777216 true false 150 255 90 239 62 213 47 191 67 179 90 203 109 218 150 225 192 218 210 203 227 181 251 194 236 217 212 240

face neutral
false
0
Circle -7500403 true true 8 7 285
Circle -16777216 true false 60 75 60
Circle -16777216 true false 180 75 60
Rectangle -16777216 true false 60 195 240 225

face sad
false
0
Circle -7500403 true true 8 8 285
Circle -16777216 true false 60 75 60
Circle -16777216 true false 180 75 60
Polygon -16777216 true false 150 168 90 184 62 210 47 232 67 244 90 220 109 205 150 198 192 205 210 220 227 242 251 229 236 206 212 183

fish
false
0
Polygon -1 true false 44 131 21 87 15 86 0 120 15 150 0 180 13 214 20 212 45 166
Polygon -1 true false 135 195 119 235 95 218 76 210 46 204 60 165
Polygon -1 true false 75 45 83 77 71 103 86 114 166 78 135 60
Polygon -7500403 true true 30 136 151 77 226 81 280 119 292 146 292 160 287 170 270 195 195 210 151 212 30 166
Circle -16777216 true false 215 106 30

flag
false
0
Rectangle -7500403 true true 60 15 75 300
Polygon -7500403 true true 90 150 270 90 90 30
Line -7500403 true 75 135 90 135
Line -7500403 true 75 45 90 45

flower
false
0
Polygon -10899396 true false 135 120 165 165 180 210 180 240 150 300 165 300 195 240 195 195 165 135
Circle -7500403 true true 85 132 38
Circle -7500403 true true 130 147 38
Circle -7500403 true true 192 85 38
Circle -7500403 true true 85 40 38
Circle -7500403 true true 177 40 38
Circle -7500403 true true 177 132 38
Circle -7500403 true true 70 85 38
Circle -7500403 true true 130 25 38
Circle -7500403 true true 96 51 108
Circle -16777216 true false 113 68 74
Polygon -10899396 true false 189 233 219 188 249 173 279 188 234 218
Polygon -10899396 true false 180 255 150 210 105 210 75 240 135 240

house
false
0
Rectangle -7500403 true true 45 120 255 285
Rectangle -16777216 true false 120 210 180 285
Polygon -7500403 true true 15 120 150 15 285 120
Line -16777216 false 30 120 270 120

leaf
false
0
Polygon -7500403 true true 150 210 135 195 120 210 60 210 30 195 60 180 60 165 15 135 30 120 15 105 40 104 45 90 60 90 90 105 105 120 120 120 105 60 120 60 135 30 150 15 165 30 180 60 195 60 180 120 195 120 210 105 240 90 255 90 263 104 285 105 270 120 285 135 240 165 240 180 270 195 240 210 180 210 165 195
Polygon -7500403 true true 135 195 135 240 120 255 105 255 105 285 135 285 165 240 165 195

line
true
0
Line -7500403 true 150 0 150 300

line half
true
0
Line -7500403 true 150 0 150 150

molecule water
true
0
Circle -1 true false 183 63 84
Circle -16777216 false false 183 63 84
Circle -7500403 true true 75 75 150
Circle -16777216 false false 75 75 150
Circle -1 true false 33 63 84
Circle -16777216 false false 33 63 84

pentagon
false
0
Polygon -7500403 true true 150 15 15 120 60 285 240 285 285 120

person
false
0
Circle -7500403 true true 110 5 80
Polygon -7500403 true true 105 90 120 195 90 285 105 300 135 300 150 225 165 300 195 300 210 285 180 195 195 90
Rectangle -7500403 true true 127 79 172 94
Polygon -7500403 true true 195 90 240 150 225 180 165 105
Polygon -7500403 true true 105 90 60 150 75 180 135 105

plant
false
0
Rectangle -7500403 true true 135 90 165 300
Polygon -7500403 true true 135 255 90 210 45 195 75 255 135 285
Polygon -7500403 true true 165 255 210 210 255 195 225 255 165 285
Polygon -7500403 true true 135 180 90 135 45 120 75 180 135 210
Polygon -7500403 true true 165 180 165 210 225 180 255 120 210 135
Polygon -7500403 true true 135 105 90 60 45 45 75 105 135 135
Polygon -7500403 true true 165 105 165 135 225 105 255 45 210 60
Polygon -7500403 true true 135 90 120 45 150 15 180 45 165 90

square
false
0
Rectangle -7500403 true true 30 30 270 270

square 2
false
0
Rectangle -7500403 true true 30 30 270 270
Rectangle -16777216 true false 60 60 240 240

star
false
0
Polygon -7500403 true true 151 1 185 108 298 108 207 175 242 282 151 216 59 282 94 175 3 108 116 108

target
false
0
Circle -7500403 true true 0 0 300
Circle -16777216 true false 30 30 240
Circle -7500403 true true 60 60 180
Circle -16777216 true false 90 90 120
Circle -7500403 true true 120 120 60

tree
false
0
Circle -7500403 true true 118 3 94
Rectangle -6459832 true false 120 195 180 300
Circle -7500403 true true 65 21 108
Circle -7500403 true true 116 41 127
Circle -7500403 true true 45 90 120
Circle -7500403 true true 104 74 152

triangle
false
0
Polygon -7500403 true true 150 30 15 255 285 255

triangle 2
false
0
Polygon -7500403 true true 150 30 15 255 285 255
Polygon -16777216 true false 151 99 225 223 75 224

truck
false
0
Rectangle -7500403 true true 4 45 195 187
Polygon -7500403 true true 296 193 296 150 259 134 244 104 208 104 207 194
Rectangle -1 true false 195 60 195 105
Polygon -16777216 true false 238 112 252 141 219 141 218 112
Circle -16777216 true false 234 174 42
Rectangle -7500403 true true 181 185 214 194
Circle -16777216 true false 144 174 42
Circle -16777216 true false 24 174 42
Circle -7500403 false true 24 174 42
Circle -7500403 false true 144 174 42
Circle -7500403 false true 234 174 42

turtle
true
0
Polygon -10899396 true false 215 204 240 233 246 254 228 266 215 252 193 210
Polygon -10899396 true false 195 90 225 75 245 75 260 89 269 108 261 124 240 105 225 105 210 105
Polygon -10899396 true false 105 90 75 75 55 75 40 89 31 108 39 124 60 105 75 105 90 105
Polygon -10899396 true false 132 85 134 64 107 51 108 17 150 2 192 18 192 52 169 65 172 87
Polygon -10899396 true false 85 204 60 233 54 254 72 266 85 252 107 210
Polygon -7500403 true true 119 75 179 75 209 101 224 135 220 225 175 261 128 261 81 224 74 135 88 99

wheel
false
0
Circle -7500403 true true 3 3 294
Circle -16777216 true false 30 30 240
Line -7500403 true 150 285 150 15
Line -7500403 true 15 150 285 150
Circle -7500403 true true 120 120 60
Line -7500403 true 216 40 79 269
Line -7500403 true 40 84 269 221
Line -7500403 true 40 216 269 79
Line -7500403 true 84 40 221 269

x
false
0
Polygon -7500403 true true 270 75 225 30 30 225 75 270
Polygon -7500403 true true 30 75 75 30 270 225 225 270

@#$#@#$#@
NetLogo 5.0.5-RC1
@#$#@#$#@
@#$#@#$#@
@#$#@#$#@
@#$#@#$#@
@#$#@#$#@
default
0.0
-0.2 0 1.0 0.0
0.0 1 1.0 0.0
0.2 0 1.0 0.0
link direction
true
0
Line -7500403 true 150 150 90 180
Line -7500403 true 150 150 210 180

@#$#@#$#@
0
@#$#@#$#@
