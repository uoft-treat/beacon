const express                   = require('express');
const bodyParser                = require('body-parser');
const path                      = require('path');
const dotenv                    = require('dotenv');
const session                   = require('express-session');
const cookieParser              = require('cookie-parser');
const flash                     = require('connect-flash');
const AuthenticationService     = require('./services/AuthenticationService');
const ExperimentTemplateService = require('./services/ExperimentTemplateService');
const ExperimentSessionService  = require('./services/ExperimentSessionService');
const {parse}                   = require('json2csv');

dotenv.config();

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(cookieParser('secret'));
app.use(session({cookie: {maxAge: 60000}}));
app.use(flash());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    app.locals.messages = req.flash();
    next();
});
app.use(async (req, res, next) => {
    if (!req.session['token']) {
        next();
    } else {
        let me;
        try {
            me = await AuthenticationService.getMe(req.session['token']);
        } catch (e) {
            return next();
        }
        req.user = me;
        next();
    }
});

app.get('/', (req, res) => res.redirect('/login'));

app.get('/login', (req, res) => {
    if (req.user) {
        return res.redirect('/dashboard');
    } else {
        res.render('login');
    }
});

app.post('/login', async (req, res) => {
    let token;
    try {
        token = await AuthenticationService.createUserToken(req.body.username, req.body.password);
    } catch (e) {
        console.log(e);
        req.flash('error', "Invalid username or password.");
    }
    req.session['token'] = token;
    return res.redirect('/login');
});

app.post('/logout', (req, res) => {
    req.user = undefined;
    res.redirect('/login');
});

app.get('/dashboard', async (req, res) => {
    const templates = await ExperimentTemplateService.getAllTemplates();
    const sessions  = await ExperimentSessionService.getAllSessions();
    res.render('dashboard', {templates, sessions});
});

app.post('/session', async (req, res) => {
    const session = await ExperimentSessionService.createNewSession(req.body.templateId);
    res.render('session', {session});
});

function getSessionHeadings(session) {
    // Get all headings
    const headings = [];
    for (const row of session.data) {
        const parsed = JSON.parse(row.jsonData);
        for (const key in parsed) {
            if (headings.indexOf(key) < 0) {
                headings.push(key);
            }
        }
    }
    return headings;
}

app.post('/export', async (req, res) => {

    const session = await ExperimentSessionService.getSessionByAccessCode(req.param('accessCode'));
    const fields  = [...getSessionHeadings(session), 'time'];

    let data = [];

    for(const row of session.data) {
        const rowData = JSON.parse(row.jsonData);
        let result = {};
        for(const key of fields) {
            result[key] = rowData[key];
        }
        result['time'] = new Date(parseInt(row.createdAt)).toISOString();
        data.push(result);
    }

    const csv = parse(data, {fields});

    res.setHeader('Content-disposition', 'attachment; filename=result.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
});

app.get('/data', async (req, res) => {
    const session  = await ExperimentSessionService.getSessionByAccessCode(req.param('accessCode'));
    // Get all headings
    const headings = getSessionHeadings(session);
    res.render('data', {session, headings});
});

app.listen(process.env.PORT || 8080, () => {
    console.log("app started...");
});
