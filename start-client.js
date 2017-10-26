/**
* This is a utility to start the react-client project, by running
* its 'npm start' script from its folder.
*/
(function() {
    const args = [ 'start' ];
    const opts = { stdio: 'inherit', cwd: 'react-client', shell: true };
    require("child_process").spawn('npm', args, opts);
})();
