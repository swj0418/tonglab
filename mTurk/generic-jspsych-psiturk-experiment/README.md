6/17/2016
- fixed fixation layering (covered by response patch during report phase)
- fixed trial progression ordering issue
- at this point the experiment progression is largely done as primary action components (instructions, start, generate experiment, show array, response) are linked into a loop that operates through information stored in a struct. The program is relatively robust thorugh its ability to adapt to conditions of the browser window.
- added rough code for selecting response targets (circles)
	- somewhat cleaned up, may be reviewed if better implementations arise

6/16/2016
- applied a better solution to target offset issue to allow for hierarchy within #showTrial divisor
- linked major phases into continuous working loop (no data record or feedback)
- set up fixation at fixed location

6/15/2016
- cleaned up rough working code and tested visual array display via css properties
	- able to display targets in centered location (fixed offset issue)
- fixed random seeding to be date based (from 1970)

6/14/2016
- wrote rough complete code for random angle spacing distribution calculating code
	- minor errors to be fixed

6/13/2016
- added instruction formatting
	- introduced viewing distance selection option and clear
- fixed gabor radius calculation algorithm
- added gabor update function for system specification selections
- building initial setup for showTrial phase

6/10/2016
A foundation for partially controlling visual angle was written up. Default values of screen size, browser resolution, viewing distance (calculated into visual angle) were set up based on majority users of browser statistics. However, a system that prompts the user to input screen size and viewing position (chosen based on provided diagram) could be used to further increase visual size consistency (the resolution can already be drawn within the program).

Possible approaches to calculating random placement of targets within an eccentricity were further brainstormed.

Trial generation, randomization, and shuffling was set up, however random splitting of the available angle for spacings of targets has yet to be determined. Next trial mechanisms and starting the experiment was written. Instructions will likely be further developed while angle spltting is further thought out.

6/9/2016
The day was primarily used to get updated on the specific details of the paradigm that would be translated into Amazon MTurk format and how this was implemented in MATLAB. I would request Young Eun's MATLAB source to be sent over to gain access to specific values but would later find that it was too impractical to try to locate relevant pieces of code (as the program was a build up from previous studies, it would also include snippets of code that would be a no op when running). As such it was decided that code would be written in my style to try to emulate how the paradigm was displayed on MATLAB. 

There were discussions of ways to possibly establish a scaling foundation in order to make the visual display conditions flexible. Possible approaches to calculating random placement of targets within an eccentricity (and not within one) were brainstormed.

6/8/2016
I was able to implement dynamic rotation on the HTML attached. Instead of utilizing canvas manipulation directly, I sourced an available lightweight online plugin that provided rotation functions. This was then applied to Brady's example structure. A local image file grating was tested.

6/7/2016
To continue from before, the grating image should be generated within MATLAB and hosted.

Question of catch trials without transparency?

It should be noted that once a working program is developed, Brady's Turk introduction video should be revisited for general optimal practices in test population management and response.

To quote Brady, "The response times measured by JavaScript were approximately 25 ms longer than those measured by PTB [PsychToolBox]. However, we found no reliable difference in the variability of the distributions related to the software, and both software packages were equally sensitive to changes in response times as a result of the experimental manipulations. We concluded that Javascript is a suitable tool for measuring reponse times in behavioral research."

Running more subjects with fewer trials is the better option, likely within 40 - 60 (possibly up to 100) trials. More power and a more precise estimate of the effect of size with this approach.

https://psiturk.org/ - provides additional information on server infrastructure which may be useful for blocking repeating participants and hosting items.

While Brady states that HTML, CSS, Javascript, Python, Perl, and MATLAB are all used as part of his pipeline, it's is likely that HTML, CSS, and Javascript are primarily used for the experiment functioning itself while Python, Perl, and MATLAB are utilized in server-side management and data conversion for analysis in MATLAB. 

6/6/2016
Brady seems to utilize Javascript as the primary method of generating interactive stimuli and gathering relevant information (i.e. mouse location) for updating displays.

Brady provides relatively simple examples of visual tasks that are hosted on his website. As pointed out in the introduction video (Mechanical Turk Tutorial page), all source code for online HITs (also Brady's examples) is available by simply right-clicking and choosing to view the page source (Google Chrome recommended). As a result, Brady's provided examples give a substantial skeleton for designing a randomized trial-based experiment along with a continuously updated response interface. The code found in the link below contains a response stage that continuously updates the response color (displayed as a circle in the center of the screen) dependent on the hovering mouse location (degrees in a circle). This behavior can be largely translated over into a response environment that produces and rotates a sine grating depending on the position of the mouse. 

view-source:http://timbrady.org/turk/ensembleindivdiff/e9/

There are options that may be taken in the generation of a sine grating, but the lack of a direct methods to generate a meshgrid and convert these arrays into an image suggests that a preloaded image manipulation may be more conventional than manually constructing a patch within the program itself. The varied sets of systems that will be running this program with different display specifications further enforces the futility of trying to generate a personalized patch to maintain control of the visual angle.

On the issue of visual angle, it is likely possible to gain information of the system window resolution, however the information about screen DPI, which is also necessary is likely not available from the client to server. If both the screen resolution and DPI is available, the program would likely simply manipulate the pixel size of the stimulus. 

Image manipulation will likely include HTML canvas which allows for image rotation.

Experimental design is simple to set up and very similar to MATLAB. Javascript equivalences to MATLAB functions will have to be explored.