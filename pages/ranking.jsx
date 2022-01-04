import React, { useState, useEffect } from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    maxWidth:'95%',
    minWidth:350,
  },
  bgroup:{
    maxWidth:'95%',
    minWidth:350,
  }
});

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#c2240b",
      light: "#ae240e"
    }
  }
});


function createData(rank, name, organisation, score) {
  return { rank, name, organisation, score };
}


export default function RankingList({
  pRankings,
  sRankings,
  poRankings,
  soRankings,
}) {
  const classes = useStyles();
  const [rows, setRowData] = useState([]);
  const [divisionTitle, setDivisionTitle] = useState("Primary");

  useEffect(() => {
    loadsRankings(pRankings);
  }, []);

  function loadsRankings(rankings) {
    let data = [];
    rankings.sort(sortBy("score"));

    rankings.map((rank, index) => {
      data.push(
        createData(index + 1, rank.name, rank.organisation, rank.score)
      );
    });
    setRowData(data);
  }

  return (
      <>
    <Head>
    <title>ICE Challenge - Ranking</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <link rel="icon" href="/favicon.ico" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
  </Head>
  <ThemeProvider theme={theme}>
    <Container maxWidth="md">
    
    <Box textAlign='center'>
    <Grid container justify="center">
      <ButtonGroup className={classes.bgroup} 
        variant="contained" color="secondary" aria-label="contained primary button group"
        display='flex' justifyContent='center'
      >
        <Button
          onClick={() => {
            loadsRankings(pRankings);
            setDivisionTitle("Primary (School)");
          }}
        >
          Primary (School)
        </Button>
        <Button
          onClick={() => {
            loadsRankings(sRankings);
            setDivisionTitle("Secondary (School)");
          }}
        >
          Secondary (School)
        </Button>
        <Button
          onClick={() => {
            loadsRankings(poRankings);
            setDivisionTitle("Primary (Open)");
          }}
        >
          Primary (Open)
        </Button>
        <Button
          onClick={() => {
            loadsRankings(soRankings);
            setDivisionTitle("Secondary (Open)");
          }}
        >
          Secondary (Open)
        </Button>
      </ButtonGroup>
      </Grid>
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        {divisionTitle} Division
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">School/ Organisation</TableCell>
              <TableCell align="center">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.rank}>
                <TableCell component="th" scope="row">
                  {row.rank}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.organisation}</TableCell>
                <TableCell align="center">{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </ThemeProvider>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  
  const res = await fetch(
    `https://codecombat.com/db/level/5b3c9e7259cae7002f0a3980/rankings?order=-1&scoreOffset=1000000&limit=500&team=humans&leagues.leagueID=602a51d6b793cf0125a4bd4c`
  );
  const data = await res.json();
  const ranks = [];
  const sRankings = [];
  const pRankings = [];
  const soRankings = [];
  const poRankings = [];

  const schoolDate = [
    {
      "codecomabtName": "ICE20211001",
      "creatorID": "603971d2533094a463f44cbf",
      "name": "Leung Kai Fung",
      "organisation": "Aberdeen Baptist Lui Ming Choi College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211002",
      "creatorID": "603971d4533094a463f44cc0",
      "name": "Zhang Tsz Kai",
      "organisation": "Aberdeen Baptist Lui Ming Choi College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211003",
      "creatorID": "603971d5533094a463f44cc1",
      "name": "Shiu Ming Ki",
      "organisation": "Aberdeen Baptist Lui Ming Choi College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211004",
      "creatorID": "603971d5533094a463f44cc2",
      "name": "Tung Ka Kiu",
      "organisation": "Aberdeen Baptist Lui Ming Choi College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211005",
      "creatorID": "603971d6533094a463f44cc3",
      "name": "Yeung Ho",
      "organisation": "AD&FD Pohl Leung Sing Tak College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211006",
      "creatorID": "603971d7533094a463f44cc4",
      "name": "Mok Yik Him Hubert",
      "organisation": "Baptist Lui Ming Choi Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211007",
      "creatorID": "603971d8533094a463f44cc5",
      "name": "Hou Yuk Kit",
      "organisation": "Baptist Lui Ming Choi Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211008",
      "creatorID": "603971d9533094a463f44cc6",
      "name": "Lo Yu Jaan",
      "organisation": "Baptist Lui Ming Choi Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211009",
      "creatorID": "603971da533094a463f44cc7",
      "name": "Cheng Chi Long",
      "organisation": "Baptist Lui Ming Choi Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211010",
      "creatorID": "603971db533094a463f44cc8",
      "name": "Yeung Kai Long",
      "organisation": "Bishopwalsh Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211011",
      "creatorID": "603971db533094a463f44cc9",
      "name": "Kwan Zuba",
      "organisation": "Bishopwalsh Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211012",
      "creatorID": "603971dc533094a463f44cca",
      "name": "Poon Ching Yin Clayton",
      "organisation": "Bishopwalsh Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211013",
      "creatorID": "603971dd533094a463f44ccb",
      "name": "Liu Man Him",
      "organisation": "Bishopwalsh Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211014",
      "creatorID": "603971de533094a463f44ccc",
      "name": "Hui Yeung Ting",
      "organisation": "Carmel Alison Lam Foundation Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211015",
      "creatorID": "603971de533094a463f44ccd",
      "name": "Cheng Tsz Hing",
      "organisation": "Carmel Alison Lam Foundation Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211016",
      "creatorID": "603971df533094a463f44cce",
      "name": "Li Yukun",
      "organisation": "Carmel Alison Lam Foundation Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211017",
      "creatorID": "603971e0533094a463f44ccf",
      "name": "Cheung Ho Yin",
      "organisation": "Carmel Alison Lam Foundation Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211018",
      "creatorID": "603971e1533094a463f44cd0",
      "name": "Chan Cheuk Yin",
      "organisation": "Carmel Pak U Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211019",
      "creatorID": "603971e2533094a463f44cd1",
      "name": "Yeung Long",
      "organisation": "Carmel Pak U Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211020",
      "creatorID": "603971e2533094a463f44cd2",
      "name": "Chiu Sing Yin",
      "organisation": "Carmel Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211021",
      "creatorID": "603971e3533094a463f44cd3",
      "name": "Wong Tsz Ho",
      "organisation": "Carmel Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211022",
      "creatorID": "603971e4533094a463f44cd4",
      "name": "Lum Long Yat",
      "organisation": "Carmel Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211023",
      "creatorID": "603971e5533094a463f44cd5",
      "name": "Sze Hoi Ching",
      "organisation": "Carmel Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211024",
      "creatorID": "603971e6533094a463f44cd6",
      "name": "Liu Chun Lai Leo",
      "organisation": "Catholic Mission School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211025",
      "creatorID": "603971e6533094a463f44cd7",
      "name": "Tong Lai Chun",
      "organisation": "Catholic Mission School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211026",
      "creatorID": "603971e7533094a463f44cd8",
      "name": "Dalla Tor Oscar",
      "organisation": "Catholic Mission School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211027",
      "creatorID": "603971e8533094a463f44cd9",
      "name": "Hang Subba Yoba",
      "organisation": "Catholic Mission School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211028",
      "creatorID": "603971e9533094a463f44cda",
      "name": "Chan Ching Hei",
      "organisation": "CCC Fung Leung Kit Memorial Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211029",
      "creatorID": "603971ea533094a463f44cdb",
      "name": "Yeung Chun Hei",
      "organisation": "CCC Fung Leung Kit Memorial Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211030",
      "creatorID": "603971ea533094a463f44cdc",
      "name": "Choi Man Hei",
      "organisation": "CCC Fung Leung Kit Memorial Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211031",
      "creatorID": "603971eb533094a463f44cdd",
      "name": "Lee Kok Ming",
      "organisation": "CCC Fung Leung Kit Memorial Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211032",
      "creatorID": "603971ec533094a463f44cde",
      "name": "Li Clement",
      "organisation": "CCC Ming Yin College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211033",
      "creatorID": "603971ed533094a463f44cdf",
      "name": "Au Tsz Kit",
      "organisation": "CCC Ming Yin College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211034",
      "creatorID": "603971ee533094a463f44ce0",
      "name": "Hon Tsz Hang",
      "organisation": "CCC Ming Yin College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211035",
      "creatorID": "603971ee533094a463f44ce1",
      "name": "Lu Cheuk Hang",
      "organisation": "CCC Ming Yin College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211036",
      "creatorID": "603971ef533094a463f44ce2",
      "name": "Lai Tsz Him",
      "organisation": "Christ College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211037",
      "creatorID": "603971f0533094a463f44ce3",
      "name": "Lio Ka Lai",
      "organisation": "Christ College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211038",
      "creatorID": "603971f1533094a463f44ce4",
      "name": "Cheung Sau Nam",
      "organisation": "Christian Alliance S W Chan Memorial College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211039",
      "creatorID": "603971f2533094a463f44ce5",
      "name": "Kaur Japneet",
      "organisation": "Confucius Hall Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211040",
      "creatorID": "603971f2533094a463f44ce6",
      "name": "Chen Zion",
      "organisation": "Creative Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211041",
      "creatorID": "603971f3533094a463f44ce7",
      "name": "Chan Cary Sirui",
      "organisation": "Diocesan Boys' School Primary Division",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211042",
      "creatorID": "603971f4533094a463f44ce8",
      "name": "Ching Helen",
      "organisation": "Diocesan Girls' School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211043",
      "creatorID": "603971f5533094a463f44ce9",
      "name": "Yuen Faith",
      "organisation": "Diocesan Girls' School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211044",
      "creatorID": "603971f6533094a463f44cea",
      "name": "Ding Trinity",
      "organisation": "Diocesan Girls' School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211045",
      "creatorID": "603971f6533094a463f44ceb",
      "name": "Lee Crystal",
      "organisation": "Diocesan Girls' School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211046",
      "creatorID": "603971f7533094a463f44cec",
      "name": "Yip Man Tou",
      "organisation": "Evangel College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211047",
      "creatorID": "603971f8533094a463f44ced",
      "name": "Cheung Ting Hong",
      "organisation": "Evangel College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211048",
      "creatorID": "603971f9533094a463f44cee",
      "name": "Wong Chun Lok",
      "organisation": "Evangel College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211049",
      "creatorID": "603971fa533094a463f44cef",
      "name": "Yu Cheuk Hei",
      "organisation": "Evangel College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211050",
      "creatorID": "603971fa533094a463f44cf0",
      "name": "Wong Shek Pang",
      "organisation": "Fanling Kau Yan College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211051",
      "creatorID": "603971fb533094a463f44cf1",
      "name": "Yeung Ho Kin",
      "organisation": "Fanling Kau Yan College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211052",
      "creatorID": "603971fc533094a463f44cf2",
      "name": "Yau Kai Dick",
      "organisation": "Fanling Kau Yan College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211053",
      "creatorID": "603971fd533094a463f44cf3",
      "name": "Aarshdeep Janday",
      "organisation": "Fanling Kau Yan College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211054",
      "creatorID": "603971fe533094a463f44cf4",
      "name": "Ng Yu",
      "organisation": "Fukien Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211055",
      "creatorID": "603971fe533094a463f44cf5",
      "name": "Tan Sik Ho Karson",
      "organisation": "Fukien Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211056",
      "creatorID": "603971ff533094a463f44cf6",
      "name": "Choi Cheuk Hang",
      "organisation": "Fukien Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211057",
      "creatorID": "60397200533094a463f44cf7",
      "name": "Lui Yin Lam",
      "organisation": "Fukien Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211058",
      "creatorID": "60397201533094a463f44cf8",
      "name": "Chiu Long Tin Isaak",
      "organisation": "G.T. (Ellen Yeung) College",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211059",
      "creatorID": "60397201533094a463f44cf9",
      "name": "Liang Xin Chu",
      "organisation": "G.T. (Ellen Yeung) College",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211060",
      "creatorID": "60397202533094a463f44cfa",
      "name": "Cheung Kwan Ho",
      "organisation": "G.T. (Ellen Yeung) College",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211061",
      "creatorID": "60397203533094a463f44cfb",
      "name": "Yip Hei Hoo",
      "organisation": "G.T. (Ellen Yeung) College",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211062",
      "creatorID": "60397204533094a463f44cfc",
      "name": "Chan Yuk Hei",
      "organisation": "Henrietta Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211063",
      "creatorID": "60397205533094a463f44cfd",
      "name": "Leung Ming Him Malin",
      "organisation": "Henrietta Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211064",
      "creatorID": "60397206533094a463f44cfe",
      "name": "Ng Man Ho",
      "organisation": "Henrietta Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211065",
      "creatorID": "60397207533094a463f44cff",
      "name": "Cheung Wang Yui",
      "organisation": "Henrietta Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211066",
      "creatorID": "60397207533094a463f44d00",
      "name": "Siu Wai Hei",
      "organisation": "HHCKLA Buddhist Ching Kok Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211067",
      "creatorID": "60397208533094a463f44d01",
      "name": "Yeung Hiu Long",
      "organisation": "HKBUAS Wong Kam Fai Secondary and Primary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211068",
      "creatorID": "60397209533094a463f44d02",
      "name": "Chan Tsz Hin",
      "organisation": "HKBUAS Wong Kam Fai Secondary and Primary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211069",
      "creatorID": "6039720a533094a463f44d03",
      "name": "Lam Geoffrey Yu Hin",
      "organisation": "HKBUAS Wong Kam Fai Secondary and Primary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211070",
      "creatorID": "6039720b533094a463f44d04",
      "name": "Chu Hok Yin",
      "organisation": "HKBUAS Wong Kam Fai Secondary and Primary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211071",
      "creatorID": "6039720b533094a463f44d05",
      "name": "Li Ching Kei Christian",
      "organisation": "HKCCCU Logos Academy",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211072",
      "creatorID": "6039720c533094a463f44d06",
      "name": "Li Hong Zephan",
      "organisation": "HKCCCU Logos Academy",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211073",
      "creatorID": "6039720d533094a463f44d07",
      "name": "Lee Chasia Yuen-Ching",
      "organisation": "HKCCCU Logos Academy",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211074",
      "creatorID": "6039720e533094a463f44d08",
      "name": "Leung Lok Hay Hayden",
      "organisation": "HKCCCU Logos Academy",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211075",
      "creatorID": "6039720f533094a463f44d09",
      "name": "Chow Nok Hei",
      "organisation": "HKCCCU Logos Academy",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211076",
      "creatorID": "6039720f533094a463f44d0a",
      "name": "Siu Ngar Chung Jenny",
      "organisation": "HKCCCU Logos Academy",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211077",
      "creatorID": "60397210533094a463f44d0b",
      "name": "Tai Pak Tung Cole",
      "organisation": "HKCCCU Logos Academy",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211078",
      "creatorID": "60397211533094a463f44d0c",
      "name": "Chan Chung Yan",
      "organisation": "HKCCCU Logos Academy",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211079",
      "creatorID": "60397212533094a463f44d0d",
      "name": "Tse Pui Sing",
      "organisation": "HKMA David Li Kwok Po College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211080",
      "creatorID": "60397212533094a463f44d0e",
      "name": "Chan Kwan Ho",
      "organisation": "HKMA David Li Kwok Po College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211081",
      "creatorID": "60397213533094a463f44d0f",
      "name": "Tseng Jun Long",
      "organisation": "HKMA David Li Kwok Po College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211082",
      "creatorID": "60397214533094a463f44d10",
      "name": "Lee Lap Yan Clement",
      "organisation": "HKMA David Li Kwok Po College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211083",
      "creatorID": "60397215533094a463f44d11",
      "name": "Law Wing Shing",
      "organisation": "HKTA The Yuen Yuen Institute No.2 Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211084",
      "creatorID": "60397216533094a463f44d12",
      "name": "So Kai Hong",
      "organisation": "HKTA The Yuen Yuen Institute No.2 Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211085",
      "creatorID": "60397216533094a463f44d13",
      "name": "Wen Meng Qian",
      "organisation": "HKTA The Yuen Yuen Institute No.2 Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211086",
      "creatorID": "60397217533094a463f44d14",
      "name": "Chow Hin Lung",
      "organisation": "HKTA The Yuen Yuen Institute No.2 Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211087",
      "creatorID": "60397218533094a463f44d15",
      "name": "Chan Cheuk Ngai",
      "organisation": "HKUGA Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211088",
      "creatorID": "60397219533094a463f44d16",
      "name": "Fung Kin Cheung",
      "organisation": "Hoi Ping Chamber Of Commerce Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211089",
      "creatorID": "6039721a533094a463f44d17",
      "name": "Li Hiu Laam",
      "organisation": "Hoi Ping Chamber Of Commerce Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211090",
      "creatorID": "6039721b533094a463f44d18",
      "name": "Chan Chi Kong Brian",
      "organisation": "Hoi Ping Chamber Of Commerce Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211091",
      "creatorID": "6039721b533094a463f44d19",
      "name": "Liang Chun Yin",
      "organisation": "Hoi Ping Chamber Of Commerce Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211092",
      "creatorID": "6039721c533094a463f44d1a",
      "name": "Wong Kwan Yau Ginny",
      "organisation": "Holy Trinity College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211093",
      "creatorID": "6039721d533094a463f44d1b",
      "name": "Yuen Cin Yee Cindy",
      "organisation": "Holy Trinity College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211094",
      "creatorID": "6039721e533094a463f44d1c",
      "name": "Tsang Cheuk Yee Cherry",
      "organisation": "Holy Trinity College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211095",
      "creatorID": "6039721f533094a463f44d1d",
      "name": "Chung Ya Ting Tina",
      "organisation": "Holy Trinity College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211096",
      "creatorID": "6039721f533094a463f44d1e",
      "name": "Li Tiantian",
      "organisation": "Hong Kong Teachers' Association Lee Heng Kwei Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211097",
      "creatorID": "60397220533094a463f44d1f",
      "name": "Chow Wing Chun",
      "organisation": "Hong Kong Teachers' Association Lee Heng Kwei Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211098",
      "creatorID": "60397221533094a463f44d20",
      "name": "Chan Sung Man",
      "organisation": "Hong Kong Teachers' Association Lee Heng Kwei Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211099",
      "creatorID": "60397222533094a463f44d21",
      "name": "Hui Ka Ying",
      "organisation": "Hong Kong Teachers' Association Lee Heng Kwei Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211100",
      "creatorID": "60397223533094a463f44d22",
      "name": "Leung Yu Sum",
      "organisation": "International Christian Quality Music Secondary And Primary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211101",
      "creatorID": "60397223533094a463f44d23",
      "name": "Wong Chun Him",
      "organisation": "International Christian Quality Music Secondary And Primary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211102",
      "creatorID": "60397224533094a463f44d24",
      "name": "Wong Yi Tung",
      "organisation": "International Christian Quality Music Secondary And Primary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211103",
      "creatorID": "60397225533094a463f44d25",
      "name": "Tsui Ryan",
      "organisation": "Kellett School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211104",
      "creatorID": "60397226533094a463f44d26",
      "name": "Jian Dennis",
      "organisation": "Kellett School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211105",
      "creatorID": "60397227533094a463f44d27",
      "name": "Bastos Henrique",
      "organisation": "Kellett School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211106",
      "creatorID": "60397227533094a463f44d28",
      "name": "Lefort Blanche",
      "organisation": "Kellett School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211107",
      "creatorID": "60397228533094a463f44d29",
      "name": "Chauhaan Manun",
      "organisation": "King George V School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211108",
      "creatorID": "60397229533094a463f44d2a",
      "name": "Shah Dhairya",
      "organisation": "King George V School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211109",
      "creatorID": "6039722a533094a463f44d2b",
      "name": "Wong Brian",
      "organisation": "King George V School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211110",
      "creatorID": "6039722b533094a463f44d2c",
      "name": "Kei Lawrence",
      "organisation": "King George V School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211111",
      "creatorID": "6039722b533094a463f44d2d",
      "name": "Liao Jun Ze",
      "organisation": "Kowloon City Baptist Church Hay Nien (Yan Ping) Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211112",
      "creatorID": "6039722c533094a463f44d2e",
      "name": "Zhang Yee Man",
      "organisation": "Kowloon City Baptist Church Hay Nien (Yan Ping) Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211113",
      "creatorID": "6039722d533094a463f44d2f",
      "name": "Yeung Ting Chi",
      "organisation": "Kowloon City Baptist Church Hay Nien (Yan Ping) Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211114",
      "creatorID": "6039722e533094a463f44d30",
      "name": "Leung Sum Kit",
      "organisation": "Kowloon City Baptist Church Hay Nien (Yan Ping) Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211115",
      "creatorID": "6039722f533094a463f44d31",
      "name": "Ha Min Kyu",
      "organisation": "Kowloon Junior School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211116",
      "creatorID": "6039722f533094a463f44d32",
      "name": "Chen Pak Kwan",
      "organisation": "Kwun Tong Government Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211117",
      "creatorID": "60397230533094a463f44d33",
      "name": "Dong Chun Hung",
      "organisation": "Kwun Tong Government Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211118",
      "creatorID": "60397231533094a463f44d34",
      "name": "Mi Ka Lok",
      "organisation": "Kwun Tong Government Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211119",
      "creatorID": "60397232533094a463f44d35",
      "name": "Shi Yu Cheung",
      "organisation": "Kwun Tong Government Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211120",
      "creatorID": "60397232533094a463f44d36",
      "name": "Kwok Chung Nin",
      "organisation": "Kwun Tong Maryknoll College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211121",
      "creatorID": "60397233533094a463f44d37",
      "name": "Lin Wenbin",
      "organisation": "Kwun Tong Maryknoll College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211122",
      "creatorID": "60397234533094a463f44d38",
      "name": "Kwan Huo Lang",
      "organisation": "Kwun Tong Maryknoll College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211123",
      "creatorID": "60397235533094a463f44d39",
      "name": "Chan Yiu Cheung",
      "organisation": "Kwun Tong Maryknoll College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211124",
      "creatorID": "60397236533094a463f44d3a",
      "name": "Chow Pak Man",
      "organisation": "Lam Tai Fai College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211125",
      "creatorID": "60397237533094a463f44d3b",
      "name": "Chan Chin Lok",
      "organisation": "Lam Tai Fai College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211126",
      "creatorID": "60397237533094a463f44d3c",
      "name": "Yeung Kei Chun",
      "organisation": "Leung Kui Kau Lutheran Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211127",
      "creatorID": "60397238533094a463f44d3d",
      "name": "Chan Foon Hang Harrison",
      "organisation": "Leung Kui Kau Lutheran Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211128",
      "creatorID": "60397239533094a463f44d3e",
      "name": "Hu Ka Yee",
      "organisation": "Leung Kui Kau Lutheran Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211129",
      "creatorID": "6039723a533094a463f44d3f",
      "name": "Kwok Chun Yat Aidan",
      "organisation": "Leung Kui Kau Lutheran Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211130",
      "creatorID": "6039723b533094a463f44d40",
      "name": "Chan Yuk Hon",
      "organisation": "LST Ku Chiu Man Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211131",
      "creatorID": "6039723b533094a463f44d41",
      "name": "Law Kwok Fung",
      "organisation": "Lui Cheung Kwong Lutheran College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211132",
      "creatorID": "6039723c533094a463f44d42",
      "name": "Lam Cheuk Chun",
      "organisation": "Lui Cheung Kwong Lutheran College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211133",
      "creatorID": "6039723d533094a463f44d43",
      "name": "Lin Weikai",
      "organisation": "Man Kiu College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211134",
      "creatorID": "6039723e533094a463f44d44",
      "name": "Yang Ziyi",
      "organisation": "Man Kiu College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211135",
      "creatorID": "6039723f533094a463f44d45",
      "name": "Xu Sum Mei",
      "organisation": "Man Kiu College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211136",
      "creatorID": "6039723f533094a463f44d46",
      "name": "Lau Yi Fei",
      "organisation": "Marymount Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211137",
      "creatorID": "60397240533094a463f44d47",
      "name": "Wong Chun Hay",
      "organisation": "Methodist College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211138",
      "creatorID": "60397241533094a463f44d48",
      "name": "Hui Hoi Ming",
      "organisation": "Methodist College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211139",
      "creatorID": "60397242533094a463f44d49",
      "name": "Chan Sing Wai",
      "organisation": "Mu Kuang English School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211140",
      "creatorID": "60397243533094a463f44d4a",
      "name": "Chan Sui Cheong",
      "organisation": "Mu Kuang English School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211141",
      "creatorID": "60397243533094a463f44d4b",
      "name": "Wu Yuehan",
      "organisation": "Mu Kuang English School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211142",
      "creatorID": "60397244533094a463f44d4c",
      "name": "Xu Wei Dong",
      "organisation": "Mu Kuang English School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211143",
      "creatorID": "60397245533094a463f44d4d",
      "name": "Lee Chun Chit Gaudi",
      "organisation": "Munsang College (Hong Kong Island)",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211144",
      "creatorID": "60397246533094a463f44d4e",
      "name": "Law Man Him Magnus",
      "organisation": "Munsang College (Hong Kong Island)",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211145",
      "creatorID": "60397247533094a463f44d4f",
      "name": "Li Ho Ming",
      "organisation": "Newman Catholic College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211146",
      "creatorID": "60397247533094a463f44d50",
      "name": "Yao Jun",
      "organisation": "Newman Catholic College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211147",
      "creatorID": "60397248533094a463f44d51",
      "name": "Io Kai Chun",
      "organisation": "Newman Catholic College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211148",
      "creatorID": "60397249533094a463f44d52",
      "name": "Ho King Wun",
      "organisation": "Newman Catholic College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211149",
      "creatorID": "6039724a533094a463f44d53",
      "name": "Wu Yau",
      "organisation": "NLSI Lui Kwok Pat Fong College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211150",
      "creatorID": "6039724b533094a463f44d54",
      "name": "Wong Shing Chak",
      "organisation": "NLSI Lui Kwok Pat Fong College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211151",
      "creatorID": "6039724b533094a463f44d55",
      "name": "Qiu Kai Yuen",
      "organisation": "NLSI Lui Kwok Pat Fong College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211152",
      "creatorID": "6039724c533094a463f44d56",
      "name": "Chung Ka Ho",
      "organisation": "NLSI Lui Kwok Pat Fong College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211153",
      "creatorID": "6039724d533094a463f44d57",
      "name": "Kwan Cheuk Lam",
      "organisation": "Notre Dame College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211154",
      "creatorID": "6039724f533094a463f44d58",
      "name": "Wu Hoi Man",
      "organisation": "Notre Dame College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211155",
      "creatorID": "60397251533094a463f44d59",
      "name": "Cheung Hoi Yan",
      "organisation": "Notre Dame College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211156",
      "creatorID": "60397252533094a463f44d5a",
      "name": "Lam Sze Ying",
      "organisation": "Notre Dame College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211157",
      "creatorID": "60397253533094a463f44d5b",
      "name": "Wong Jayden Moses",
      "organisation": "Pui Ching Middle School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211158",
      "creatorID": "60397253533094a463f44d5c",
      "name": "Chan Chi Ho",
      "organisation": "Pui Ching Middle School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211159",
      "creatorID": "60397254533094a463f44d5d",
      "name": "Li Kit Ning",
      "organisation": "Pui Ching Middle School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211160",
      "creatorID": "60397255533094a463f44d5e",
      "name": "Chik Hong Ki Crystal",
      "organisation": "Pui Ching Middle School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211161",
      "creatorID": "60397256533094a463f44d5f",
      "name": "Chan Pak Yui Nick",
      "organisation": "PLK Fong Wong Kam Chuen Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211162",
      "creatorID": "60397257533094a463f44d60",
      "name": "Wu Hiu Nam, Tristan",
      "organisation": "Po Leung Kuk Camões Tan Siu Lin Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211163",
      "creatorID": "60397258533094a463f44d61",
      "name": "Lam Cheuk Yat Ivan",
      "organisation": "Po Leung Kuk Camões Tan Siu Lin Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211164",
      "creatorID": "60397258533094a463f44d62",
      "name": "Law Yu Sing Carter",
      "organisation": "Po Leung Kuk Camões Tan Siu Lin Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211165",
      "creatorID": "60397259533094a463f44d63",
      "name": "Lau Wang Lok Marcus",
      "organisation": "Po Leung Kuk Camões Tan Siu Lin Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211166",
      "creatorID": "6039725a533094a463f44d64",
      "name": "Ngo Po Hei",
      "organisation": "Po Leung Kuk Ho Yuk Ching 1984 College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211167",
      "creatorID": "6039725b533094a463f44d65",
      "name": "Cheung Ching Ho",
      "organisation": "Po Leung Kuk Ho Yuk Ching 1984 College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211168",
      "creatorID": "6039725c533094a463f44d66",
      "name": "Tsang Chun Man",
      "organisation": "Po Leung Kuk Ho Yuk Ching 1984 College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211169",
      "creatorID": "6039725c533094a463f44d67",
      "name": "Sin King Chun",
      "organisation": "Po Leung Kuk Ho Yuk Ching 1984 College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211170",
      "creatorID": "6039725d533094a463f44d68",
      "name": "Leung Yat Lon",
      "organisation": "S.K.H. Tsang Shiu Tim Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211171",
      "creatorID": "6039725e533094a463f44d69",
      "name": "Chan Yik Hei",
      "organisation": "S.K.H. Tsang Shiu Tim Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211172",
      "creatorID": "6039725f533094a463f44d6a",
      "name": "Zhu Jiecheng",
      "organisation": "S.K.H. Tsang Shiu Tim Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211173",
      "creatorID": "60397260533094a463f44d6b",
      "name": "Zhu Kit Ngai",
      "organisation": "S.K.H. Tsang Shiu Tim Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211174",
      "creatorID": "60397260533094a463f44d6c",
      "name": "Ho Chun Hin",
      "organisation": "Sai Kung Sung Tsun Catholic School (Secondary Section)",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211175",
      "creatorID": "60397261533094a463f44d6d",
      "name": "Tsang Shing Kong",
      "organisation": "SDB Ng Siu Mui Secondary school",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211176",
      "creatorID": "60397262533094a463f44d6e",
      "name": "Chan Yin Ming",
      "organisation": "Sing Yin Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211177",
      "creatorID": "60397263533094a463f44d6f",
      "name": "Cheung Yik Fung",
      "organisation": "Sing Yin Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211178",
      "creatorID": "60397264533094a463f44d70",
      "name": "Chan Ho Yin",
      "organisation": "Sing Yin Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211179",
      "creatorID": "60397264533094a463f44d71",
      "name": "Yung Sze Wai",
      "organisation": "Sing Yin Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211180",
      "creatorID": "60397265533094a463f44d72",
      "name": "Wong Lai Kong",
      "organisation": "SKH Holy Trinity Church Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211181",
      "creatorID": "60397266533094a463f44d73",
      "name": "Wan Ka Yu",
      "organisation": "SKH Holy Trinity Church Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211182",
      "creatorID": "60397267533094a463f44d74",
      "name": "Yiu Shing Sum",
      "organisation": "SKH Holy Trinity Church Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211183",
      "creatorID": "60397268533094a463f44d75",
      "name": "Chan Chi Fung",
      "organisation": "SKH Lam Kau Mow Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211184",
      "creatorID": "60397268533094a463f44d76",
      "name": "Wong Hei Tung",
      "organisation": "SKH Lam Kau Mow Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211185",
      "creatorID": "60397269533094a463f44d77",
      "name": "Lam Tsz Yi",
      "organisation": "SKH Lam Kau Mow Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211186",
      "creatorID": "6039726a533094a463f44d78",
      "name": "Choi Chak Long",
      "organisation": "SKH Lam Woo Memorial Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211187",
      "creatorID": "6039726b533094a463f44d79",
      "name": "Yao Kit Hei Joshua",
      "organisation": "SKH Lam Woo Memorial Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211188",
      "creatorID": "6039726c533094a463f44d7a",
      "name": "Ho Tsz Ki",
      "organisation": "SKH Lam Woo Memorial Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211189",
      "creatorID": "6039726c533094a463f44d7b",
      "name": "Mei Ka Wai",
      "organisation": "SKH Lam Woo Memorial Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211190",
      "creatorID": "6039726d533094a463f44d7c",
      "name": "Ho Pak Hei",
      "organisation": "SKH Lui Ming Choi Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211191",
      "creatorID": "6039726e533094a463f44d7d",
      "name": "Cheung Ka Wing",
      "organisation": "SKH Lui Ming Choi Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211192",
      "creatorID": "6039726f533094a463f44d7e",
      "name": "Luo Hongbin",
      "organisation": "SKH Lui Ming Choi Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211193",
      "creatorID": "60397270533094a463f44d7f",
      "name": "Wong Pui Yat",
      "organisation": "SKH Lui Ming Choi Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211194",
      "creatorID": "60397270533094a463f44d80",
      "name": "Hui Chak Bong",
      "organisation": "SKH Tang Shiu Kin Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211195",
      "creatorID": "60397271533094a463f44d81",
      "name": "Chan Yat Long Ariel",
      "organisation": "SKH Tang Shiu Kin Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211196",
      "creatorID": "60397272533094a463f44d82",
      "name": "Yu Wan Tat",
      "organisation": "St. Louis School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211197",
      "creatorID": "60397273533094a463f44d83",
      "name": "Kwok Tsz Him",
      "organisation": "St. Louis School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211198",
      "creatorID": "60397273533094a463f44d84",
      "name": "Lee Ho Nam",
      "organisation": "St. Louis School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211199",
      "creatorID": "60397274533094a463f44d85",
      "name": "Chung Alson Dorian",
      "organisation": "St. Louis School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211200",
      "creatorID": "60397275533094a463f44d86",
      "name": "Tam Tsz Ching",
      "organisation": "St. Clare's Girls' School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211201",
      "creatorID": "60397276533094a463f44d87",
      "name": "Lee Cheuk Wing",
      "organisation": "St. Clare's Girls' School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211202",
      "creatorID": "60397277533094a463f44d88",
      "name": "Chan Kei Lam",
      "organisation": "St. Clare's Girls' School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211203",
      "creatorID": "60397277533094a463f44d89",
      "name": "Mak Hoi Lok",
      "organisation": "St. Clare's Girls' School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211204",
      "creatorID": "60397278533094a463f44d8a",
      "name": "Li Wai Shing",
      "organisation": "STFA Lee Shau Kee College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211205",
      "creatorID": "60397279533094a463f44d8b",
      "name": "Peng Hiu Nam",
      "organisation": "Taoist Ching Chung Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211206",
      "creatorID": "6039727a533094a463f44d8c",
      "name": "Siu Pak Kiu",
      "organisation": "Taoist Ching Chung Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211207",
      "creatorID": "6039727b533094a463f44d8d",
      "name": "Luo Jet",
      "organisation": "Taoist Ching Chung Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211208",
      "creatorID": "6039727c533094a463f44d8e",
      "name": "Cho Shun Wun",
      "organisation": "Taoist Ching Chung Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211209",
      "creatorID": "6039727c533094a463f44d8f",
      "name": "Law Sau Ho",
      "organisation": "The Y.W.C.A. Hioe Tjo Yoeng College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211210",
      "creatorID": "6039727d533094a463f44d90",
      "name": "Chan Yiu Chun",
      "organisation": "The Y.W.C.A. Hioe Tjo Yoeng College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211211",
      "creatorID": "6039727e533094a463f44d91",
      "name": "Qian Yee Ki",
      "organisation": "The Y.W.C.A. Hioe Tjo Yoeng College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211212",
      "creatorID": "6039727f533094a463f44d92",
      "name": "Chen Yunyang",
      "organisation": "The Y.W.C.A. Hioe Tjo Yoeng College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211213",
      "creatorID": "60397280533094a463f44d93",
      "name": "Leung Tsz Tung",
      "organisation": "Tseung Kwan O Government Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211214",
      "creatorID": "60397280533094a463f44d94",
      "name": "Tse Sze Hang",
      "organisation": "Tseung Kwan O Government Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211215",
      "creatorID": "60397281533094a463f44d95",
      "name": "Yau Shing Tsun",
      "organisation": "Tseung Kwan O Government Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211216",
      "creatorID": "60397282533094a463f44d96",
      "name": "Cheung Hung Yam",
      "organisation": "Tseung Kwan O Government Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211217",
      "creatorID": "60397283533094a463f44d97",
      "name": "Lee Ka Ho",
      "organisation": "Tung Chung Catholic School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211218",
      "creatorID": "60397284533094a463f44d98",
      "name": "Leung Miu Nam",
      "organisation": "Tung Chung Catholic School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211219",
      "creatorID": "60397284533094a463f44d99",
      "name": "Zhang Quan Qiao",
      "organisation": "Tung Chung Catholic School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211220",
      "creatorID": "60397285533094a463f44d9a",
      "name": "Sui Chit",
      "organisation": "Tung Chung Catholic School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211221",
      "creatorID": "60397286533094a463f44d9b",
      "name": "Wong Tin Chi Felix",
      "organisation": "Tung Wan Mok Law Shui Wah School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211222",
      "creatorID": "60397287533094a463f44d9c",
      "name": "Ho Yau Yip",
      "organisation": "Tung Wan Mok Law Shui Wah School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211223",
      "creatorID": "60397288533094a463f44d9d",
      "name": "Chow Cheuk Hei",
      "organisation": "TWGHs Sun Hoi Directors' College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211224",
      "creatorID": "60397288533094a463f44d9e",
      "name": "Mok Lok Him",
      "organisation": "TWGHs Sun Hoi Directors' College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211225",
      "creatorID": "60397289533094a463f44d9f",
      "name": "Li Chun Ho",
      "organisation": "TWGHs Sun Hoi Directors' College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211226",
      "creatorID": "6039728a533094a463f44da0",
      "name": "Tsai San",
      "organisation": "TWGHs Sun Hoi Directors' College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211227",
      "creatorID": "6039728b533094a463f44da1",
      "name": "Leung Ho Yin",
      "organisation": "Wah Yan College, Kowloon",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211228",
      "creatorID": "6039728b533094a463f44da2",
      "name": "Leung Ka Chai",
      "organisation": "Wah Yan College, Kowloon",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211229",
      "creatorID": "6039728c533094a463f44da3",
      "name": "Wong Eden",
      "organisation": "Wah Yan College, Kowloon",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211230",
      "creatorID": "6039728d533094a463f44da4",
      "name": "Ng Shing Hin",
      "organisation": "Wah Yan College, Kowloon",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211231",
      "creatorID": "6039728e533094a463f44da5",
      "name": "Ho Yin Kit",
      "organisation": "Raimondi College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211232",
      "creatorID": "6039728f533094a463f44da6",
      "name": "Tsang Chi Kiu",
      "organisation": "Raimondi College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211233",
      "creatorID": "6039728f533094a463f44da7",
      "name": "Wong Mo Tien",
      "organisation": "Raimondi College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211234",
      "creatorID": "60397290533094a463f44da8",
      "name": "Cheng Hoi Pak",
      "organisation": "Yan Chai Hospital Tung Chi Ying Memorial Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211235",
      "creatorID": "60397291533094a463f44da9",
      "name": "Yip Man Shing",
      "organisation": "Yan Chai Hospital Tung Chi Ying Memorial Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211236",
      "creatorID": "60397292533094a463f44daa",
      "name": "Ng Wa Kwan",
      "organisation": "Yan Chai Hospital Tung Chi Ying Memorial Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211237",
      "creatorID": "60397293533094a463f44dab",
      "name": "Li Junjie",
      "organisation": "Yan Chai Hospital Tung Chi Ying Memorial Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211238",
      "creatorID": "60397294533094a463f44dac",
      "name": "Wong Yip San",
      "organisation": "Yan Chai Hospital Wong Wha San Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211239",
      "creatorID": "60397294533094a463f44dad",
      "name": "Kung Kin Fung",
      "organisation": "Yan Chai Hospital Wong Wha San Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211240",
      "creatorID": "60397295533094a463f44dae",
      "name": "Shi Ka Yu",
      "organisation": "Yan Chai Hospital Wong Wha San Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211241",
      "creatorID": "60397296533094a463f44daf",
      "name": "Su Chiu Yam",
      "organisation": "Yan Chai Hospital Wong Wha San Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211242",
      "creatorID": "60397297533094a463f44db0",
      "name": "Man Chun Yip",
      "organisation": "Yuen Long Merchants Association Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211243",
      "creatorID": "60397298533094a463f44db1",
      "name": "Ngan Chun Lai",
      "organisation": "Yuen Long Merchants Association Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211244",
      "creatorID": "60397298533094a463f44db2",
      "name": "Kan Cheuk Wing",
      "organisation": "Yuen Long Merchants Association Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211245",
      "creatorID": "60397299533094a463f44db3",
      "name": "Chen Ho Yin",
      "organisation": "Yuen Long Merchants Association Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211246",
      "creatorID": "6039729a533094a463f44db4",
      "name": "Lo Ching Ching",
      "organisation": "HKTA The Yuen Yuen Institute No.3 Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211247",
      "creatorID": "6039729b533094a463f44db5",
      "name": "Leung Long Hey",
      "organisation": "HKTA The Yuen Yuen Institute No.3 Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211248",
      "creatorID": "6039729c533094a463f44db6",
      "name": "Li Shi Hong",
      "organisation": "HKTA The Yuen Yuen Institute No.3 Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211249",
      "creatorID": "6039729c533094a463f44db7",
      "name": "Wong Yeuk Ming",
      "organisation": "HKTA The Yuen Yuen Institute No.3 Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211250",
      "creatorID": "6039729d533094a463f44db8",
      "name": "Wen Weifeng",
      "organisation": "Cotton Spinners Association Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211251",
      "creatorID": "6039729e533094a463f44db9",
      "name": "Zhu Junrong",
      "organisation": "Cotton Spinners Association Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211252",
      "creatorID": "6039729f533094a463f44dba",
      "name": "Pang Zhongxian",
      "organisation": "Cotton Spinners Association Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211253",
      "creatorID": "603972a0533094a463f44dbb",
      "name": "Wong Yin Yu",
      "organisation": "Cotton Spinners Association Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211254",
      "creatorID": "603972a0533094a463f44dbc",
      "name": "Ao Pui In",
      "organisation": "Macau Baptist College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211255",
      "creatorID": "603972a1533094a463f44dbd",
      "name": "Chan Su Ham",
      "organisation": "Macau Baptist College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211256",
      "creatorID": "603972a2533094a463f44dbe",
      "name": "Chan Man Yam",
      "organisation": "Cognitio College (Kowloon)",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211257",
      "creatorID": "603972a3533094a463f44dbf",
      "name": "Li Ka Yan",
      "organisation": "Cognitio College (Kowloon)",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211258",
      "creatorID": "603972a4533094a463f44dc0",
      "name": "Liu Chak Fun",
      "organisation": "Cognitio College (Kowloon)",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211259",
      "creatorID": "603972a4533094a463f44dc1",
      "name": "Ng Cheuk San",
      "organisation": "Cognitio College (Kowloon)",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211260",
      "creatorID": "603972a5533094a463f44dc2",
      "name": "Lee Amy",
      "organisation": "HKUGA College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211261",
      "creatorID": "603972a6533094a463f44dc3",
      "name": "Chan Deion",
      "organisation": "HKUGA College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211262",
      "creatorID": "603972a7533094a463f44dc4",
      "name": "Yeung Justin",
      "organisation": "HKUGA College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211263",
      "creatorID": "603972a8533094a463f44dc5",
      "name": "Lai Laurence",
      "organisation": "HKUGA College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211264",
      "creatorID": "603972a8533094a463f44dc6",
      "name": "Chan Chak Yan",
      "organisation": "Kowloon Bay St. John The Baptist Catholic Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211265",
      "creatorID": "603972a9533094a463f44dc7",
      "name": "Chen Lok Yin",
      "organisation": "Kowloon Bay St. John The Baptist Catholic Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211266",
      "creatorID": "603972aa533094a463f44dc8",
      "name": "Wong Wing Yan",
      "organisation": "Kowloon Bay St. John The Baptist Catholic Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211267",
      "creatorID": "603972ab533094a463f44dc9",
      "name": "Tan Sze Yuen",
      "organisation": "Kowloon Bay St. John The Baptist Catholic Primary School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211268",
      "creatorID": "603972ac533094a463f44dca",
      "name": "Cheng Chung Kit",
      "organisation": "TIACC Woo Hon Fai Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211269",
      "creatorID": "603972ac533094a463f44dcb",
      "name": "Li Man Hei",
      "organisation": "TIACC Woo Hon Fai Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211270",
      "creatorID": "603972ad533094a463f44dcc",
      "name": "Zheng Ka Yu",
      "organisation": "TIACC Woo Hon Fai Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211271",
      "creatorID": "603972ae533094a463f44dcd",
      "name": "Yao Chun Shum",
      "organisation": "TIACC Woo Hon Fai Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211272",
      "creatorID": "603972af533094a463f44dce",
      "name": "Pun Ho Yin Aden",
      "organisation": "Tak Sun School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211273",
      "creatorID": "603972b0533094a463f44dcf",
      "name": "Ng Tsz Nok",
      "organisation": "Tak Sun School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211274",
      "creatorID": "603972b1533094a463f44dd0",
      "name": "Leung Sui Hei",
      "organisation": "Tak Sun School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211275",
      "creatorID": "603972b1533094a463f44dd1",
      "name": "Ou Zhi Xin",
      "organisation": "Tak Sun School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211276",
      "creatorID": "603972b2533094a463f44dd2",
      "name": "Li Ji Kei",
      "organisation": "CNEC Ta Tung School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211277",
      "creatorID": "603972b3533094a463f44dd3",
      "name": "Lin Pak Hei",
      "organisation": "CNEC Ta Tung School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211278",
      "creatorID": "603972b4533094a463f44dd4",
      "name": "Siu Zi Yeung",
      "organisation": "CNEC Ta Tung School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211279",
      "creatorID": "603972b4533094a463f44dd5",
      "name": "Kwan Ga Yan",
      "organisation": "CNEC Ta Tung School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211280",
      "creatorID": "603972b5533094a463f44dd6",
      "name": "Lou Jia Qi",
      "organisation": "Confucius Hall Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211281",
      "creatorID": "603972b6533094a463f44dd7",
      "name": "Guzman Levannah Chelsea Domingo",
      "organisation": "Confucius Hall Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211282",
      "creatorID": "603972b7533094a463f44dd8",
      "name": "Li Tsun Yeung Rex",
      "organisation": "Confucius Hall Secondary School",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211283",
      "creatorID": "603972b8533094a463f44dd9",
      "name": "Cho Sze King",
      "organisation": "St. Stephen's Church College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211284",
      "creatorID": "603972b8533094a463f44dda",
      "name": "Suen Siu Hin",
      "organisation": "St. Stephen's Church College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211285",
      "creatorID": "603972b9533094a463f44ddb",
      "name": "Allen Marie Cleofe Poliquit Princess",
      "organisation": "St. Stephen's Church College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211286",
      "creatorID": "603972ba533094a463f44ddc",
      "name": "Ng Wang Hin",
      "organisation": "St. Stephen's Church College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211287",
      "creatorID": "603972bb533094a463f44ddd",
      "name": "Chan Rachael",
      "organisation": "St. Stephen’s Girls’ College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211288",
      "creatorID": "603972bc533094a463f44dde",
      "name": "Hui Yat Yin",
      "organisation": "St. Stephen’s Girls’ College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211289",
      "creatorID": "603972bd533094a463f44ddf",
      "name": "Yam Chee Yin",
      "organisation": "St. Stephen’s Girls’ College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211290",
      "creatorID": "603972bd533094a463f44de0",
      "name": "Ng Hei Yi",
      "organisation": "St. Stephen’s Girls’ College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211291",
      "creatorID": "60405b95b6144800a40bef70",
      "name": "Chechar Swayam",
      "organisation": "Kowloon Junior School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211292",
      "creatorID": "60405beab6144800a40bf0c1",
      "name": "Ng Isaac",
      "organisation": "Kowloon Junior School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211293",
      "creatorID": "60405c1fb6144800a40bf16d",
      "name": "Mishra Urvi",
      "organisation": "Kowloon Junior School",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211294",
      "creatorID": "60405a9ab6144800a40bea1b",
      "name": "Ng Chun Hei Maxx",
      "organisation": "Lam Tai Fai College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211295",
      "creatorID": "60405b338d619f003ad058b1",
      "name": "Yim Tsz Lok",
      "organisation": "Lam Tai Fai College",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211301",
      "creatorID": "604ffe6994cbf1a112fe8a29",
      "name": "Wang Kin Seng",
      "organisation": "Pui Ching Middle School (Macau)",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211302",
      "creatorID": "604ffe6b94cbf1a112fe8a2a",
      "name": "Chan Wang Chon",
      "organisation": "Pui Ching Middle School (Macau)",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211303",
      "creatorID": "604ffe6c94cbf1a112fe8a2b",
      "name": "Ieon Cory Hoi Yip",
      "organisation": "Pui Ching Middle School (Macau)",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211304",
      "creatorID": "604ffe6e94cbf1a112fe8a2c",
      "name": "Wong In Chi",
      "organisation": "Pui Ching Middle School (Macau)",
      "division": "SS"
    },
    {
      "codecomabtName": "ICE20211305",
      "creatorID": "604ffe7094cbf1a112fe8a2d",
      "name": "Pang Kuan Tou",
      "organisation": "Pui Ching Middle School (Macau)",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211306",
      "creatorID": "604ffe7394cbf1a112fe8a2e",
      "name": "Wu Iat Long",
      "organisation": "Pui Ching Middle School (Macau)",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211307",
      "creatorID": "604ffe7494cbf1a112fe8a2f",
      "name": "Hamamoto Rio",
      "organisation": "Pui Ching Middle School (Macau)",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20211308",
      "creatorID": "604ffe7594cbf1a112fe8a30",
      "name": "Chan Seong Lai",
      "organisation": "Pui Ching Middle School (Macau)",
      "division": "SP"
    },
    {
      "codecomabtName": "ICE20212001",
      "creatorID": "6046c8c762fbb2572f5dcda1",
      "name": "Saxena Shrihaan",
      "organisation": "INSPIRE Education",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212002",
      "creatorID": "6046c8c962fbb2572f5dcda2",
      "name": "Li Sun Young",
      "organisation": "INSPIRE Education",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212003",
      "creatorID": "6046c8cb62fbb2572f5dcda3",
      "name": "Guo Allan",
      "organisation": "INSPIRE Education",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212004",
      "creatorID": "6046c8cc62fbb2572f5dcda4",
      "name": "Poon Lucas",
      "organisation": "INSPIRE Education",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212005",
      "creatorID": "6046c8ce62fbb2572f5dcda5",
      "name": "Cha Owen",
      "organisation": "INSPIRE Education",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212006",
      "creatorID": "6046c8d062fbb2572f5dcda6",
      "name": "Chen Daniel",
      "organisation": "INSPIRE Education",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212007",
      "creatorID": "6046c8d262fbb2572f5dcda7",
      "name": "Jin Helen Yu",
      "organisation": "INSPIRE Education",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212008",
      "creatorID": "6046c8d462fbb2572f5dcda8",
      "name": "Koo Yan Yuet",
      "organisation": "INSPIRE Education",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212009",
      "creatorID": "6046c8d562fbb2572f5dcda9",
      "name": "Lai Ching Sze",
      "organisation": "INSPIRE Education",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212010",
      "creatorID": "6046c8d762fbb2572f5dcdaa",
      "name": "Wong Lok Yiu",
      "organisation": "INSPIRE Education",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212011",
      "creatorID": "6046c8d962fbb2572f5dcdab",
      "name": "Yu Lok Sze Nikki",
      "organisation": "INSPIRE Education",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212012",
      "creatorID": "6046c8da62fbb2572f5dcdac",
      "name": "Wan Chung Ching",
      "organisation": "INSPIRE Education",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212013",
      "creatorID": "6046c8dc62fbb2572f5dcdad",
      "name": "Yu Ho Hin",
      "organisation": "Academy for Bright Future Young Engineers, HKUST",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212014",
      "creatorID": "6046c8de62fbb2572f5dcdae",
      "name": "Cheng Chi Yan",
      "organisation": "Academy for Bright Future Young Engineers, HKUST",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212015",
      "creatorID": "6046c8e062fbb2572f5dcdaf",
      "name": "Yeung Kam Lun",
      "organisation": "Academy for Bright Future Young Engineers, HKUST",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212016",
      "creatorID": "6046c8e162fbb2572f5dcdb0",
      "name": "Li Ho Ming",
      "organisation": "Academy for Bright Future Young Engineers, HKUST",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212017",
      "creatorID": "6046c8e362fbb2572f5dcdb1",
      "name": "Qian Hongyi",
      "organisation": "Academy for Bright Future Young Engineers, HKUST",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212018",
      "creatorID": "6046c8e562fbb2572f5dcdb2",
      "name": "Leung Tze Lap Angus",
      "organisation": "Academy for Bright Future Young Engineers, HKUST",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212019",
      "creatorID": "6046c8e762fbb2572f5dcdb3",
      "name": "Tang Yu Hin Anson",
      "organisation": "Academy for Bright Future Young Engineers, HKUST",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212020",
      "creatorID": "6046c8e862fbb2572f5dcdb4",
      "name": "Tang Hiu Yuet Audrey",
      "organisation": "Academy for Bright Future Young Engineers, HKUST",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212021",
      "creatorID": "6046c8ea62fbb2572f5dcdb5",
      "name": "Chan Hui Sing Collin",
      "organisation": "Academy for Bright Future Young Engineers, HKUST",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212022",
      "creatorID": "6046c8ec62fbb2572f5dcdb6",
      "name": "Li Chun Lok",
      "organisation": "Academy for Bright Future Young Engineers, HKUST",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212023",
      "creatorID": "6046c8ee62fbb2572f5dcdb7",
      "name": "Ip Jing Chuen",
      "organisation": "Academy for Bright Future Young Engineers, HKUST",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212024",
      "creatorID": "6046c8ef62fbb2572f5dcdb8",
      "name": "Yu Cheuk Hang",
      "organisation": "Academy for Bright Future Young Engineers, HKUST",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212025",
      "creatorID": "6046c8f162fbb2572f5dcdb9",
      "name": "Sit Pok Shun Jaden",
      "organisation": "Academy for Bright Future Young Engineers, HKUST",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212026",
      "creatorID": "6046c8f362fbb2572f5dcdba",
      "name": "Liu Han Lin",
      "organisation": "Academy for Bright Future Young Engineers, HKUST",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212027",
      "creatorID": "6046c8f562fbb2572f5dcdbb",
      "name": "Choi Hon Man Ean",
      "organisation": "Academy for Bright Future Young Engineers, HKUST",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212028",
      "creatorID": "6046c8f662fbb2572f5dcdbc",
      "name": "Choi Hon Ting Etan",
      "organisation": "Academy for Bright Future Young Engineers, HKUST",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212029",
      "creatorID": "6046c8f862fbb2572f5dcdbd",
      "name": "Jiang Mason",
      "organisation": "ENCODE Education",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212030",
      "creatorID": "6046c8fa62fbb2572f5dcdbe",
      "name": "Kwok Yik Sum",
      "organisation": "ENCODE Education",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212031",
      "creatorID": "6046c8fb62fbb2572f5dcdbf",
      "name": "Haj-mohammed Emran",
      "organisation": "ENCODE Education",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212032",
      "creatorID": "6046c8fd62fbb2572f5dcdc0",
      "name": "Cheung Ka Hei",
      "organisation": "ENCODE Education",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212033",
      "creatorID": "6046c8ff62fbb2572f5dcdc1",
      "name": "Vallat Wang Jean Xinyuan",
      "organisation": "ENCODE Education",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212034",
      "creatorID": "6046c90062fbb2572f5dcdc2",
      "name": "Wong Logan",
      "organisation": "ICanCode",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212035",
      "creatorID": "6046c90262fbb2572f5dcdc3",
      "name": "Tai Siu Hang Edvis",
      "organisation": "ICanCode",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212036",
      "creatorID": "6046c90462fbb2572f5dcdc4",
      "name": "Kan Cayden",
      "organisation": "ICanCode",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212037",
      "creatorID": "6046c90662fbb2572f5dcdc5",
      "name": "Tung Man Lok",
      "organisation": "ICanCode",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212038",
      "creatorID": "6046c90762fbb2572f5dcdc6",
      "name": "Lam Jack O Juno",
      "organisation": "ICanCode",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212039",
      "creatorID": "6046c90962fbb2572f5dcdc7",
      "name": "Xu Ruo Fan",
      "organisation": "ICanCode",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212040",
      "creatorID": "6046c90b62fbb2572f5dcdc8",
      "name": "Ip Ho Yan Goran",
      "organisation": "ICanCode",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212041",
      "creatorID": "6046c90c62fbb2572f5dcdc9",
      "name": "Tsang Hau Hei",
      "organisation": "ICanCode",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212042",
      "creatorID": "6046c90e62fbb2572f5dcdca",
      "name": "Lu Shing Hei, Dick",
      "organisation": "ICanCode",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212043",
      "creatorID": "6046c91062fbb2572f5dcdcb",
      "name": "Chan Kin Nok, Noddy",
      "organisation": "ICanCode",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212044",
      "creatorID": "6046c91262fbb2572f5dcdcc",
      "name": "Kwan Cedric",
      "organisation": "ICanCode",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212045",
      "creatorID": "6046c91362fbb2572f5dcdcd",
      "name": "Leung Man Tik",
      "organisation": "ICanCode",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212046",
      "creatorID": "6046c91562fbb2572f5dcdce",
      "name": "Pak Jayce",
      "organisation": "ICanCode",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212047",
      "creatorID": "6046c91762fbb2572f5dcdcf",
      "name": "So Chun Yan Ryan",
      "organisation": "ICanCode",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212048",
      "creatorID": "6046c91962fbb2572f5dcdd0",
      "name": "Au Sik Kiu Alisa",
      "organisation": "ICanCode",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212049",
      "creatorID": "6046c91a62fbb2572f5dcdd1",
      "name": "Liu Liu Ngan Ting",
      "organisation": "ICanCode",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212050",
      "creatorID": "6046c91c62fbb2572f5dcdd2",
      "name": "Cheng Chung Murray",
      "organisation": "ICanCode",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212051",
      "creatorID": "6046c91e62fbb2572f5dcdd3",
      "name": "Chan Hasan Hin Wing",
      "organisation": "ICanCode",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212052",
      "creatorID": "6046c91f62fbb2572f5dcdd4",
      "name": "Lam Ho Wan",
      "organisation": "ICanCode",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212098",
      "creatorID": "6046e511b7cf9901871ae91d",
      "name": "Au Ka Nok, Dicky",
      "organisation": "ICanCode",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212054",
      "creatorID": "6046c92362fbb2572f5dcdd6",
      "name": "Hung Yat Yin",
      "organisation": "Hour of Code",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212055",
      "creatorID": "6046c92462fbb2572f5dcdd7",
      "name": "Hung Ching Ngo",
      "organisation": "Hour of Code",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212056",
      "creatorID": "6046c92662fbb2572f5dcdd8",
      "name": "Ng Lok Yan Yannis",
      "organisation": "Hour of Code",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212057",
      "creatorID": "6046c92862fbb2572f5dcdd9",
      "name": "Wong Hayson",
      "organisation": "Hour of Code",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212058",
      "creatorID": "6046c92962fbb2572f5dcdda",
      "name": "Chan Jago",
      "organisation": "Hour of Code",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212059",
      "creatorID": "6046c92b62fbb2572f5dcddb",
      "name": "Lai Yau Chai Marcus",
      "organisation": "Hour of Code",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212060",
      "creatorID": "6046c92d62fbb2572f5dcddc",
      "name": "Cheng Ching Kiu Kingsley",
      "organisation": "Hour of Code",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212061",
      "creatorID": "6046c92f62fbb2572f5dcddd",
      "name": "Chen Lucas",
      "organisation": "Hour of Code",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212062",
      "creatorID": "6046c93062fbb2572f5dcdde",
      "name": "Chu Hui Chyun",
      "organisation": "Hour of Code",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212063",
      "creatorID": "6046c93262fbb2572f5dcddf",
      "name": "Tang Ka Lam",
      "organisation": "Hour of Code",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212064",
      "creatorID": "6046c93462fbb2572f5dcde0",
      "name": "Chau Wai Hin",
      "organisation": "Hour of Code",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212065",
      "creatorID": "6046c93562fbb2572f5dcde1",
      "name": "Lam Lap Yu Michael",
      "organisation": "Hour of Code",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212066",
      "creatorID": "6046c93762fbb2572f5dcde2",
      "name": "Cheung Chun Lok",
      "organisation": "Hour of Code",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212072",
      "creatorID": "6046c94162fbb2572f5dcde8",
      "name": "Mok Chun Lam Nathan",
      "organisation": "Hour of Code",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212073",
      "creatorID": "6046c94362fbb2572f5dcde9",
      "name": "Lo Lok Louis",
      "organisation": "Hour of Code",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212069",
      "creatorID": "6046c93c62fbb2572f5dcde5",
      "name": "Lai Aidan",
      "organisation": "Hour of Code",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212075",
      "creatorID": "6046c94662fbb2572f5dcdeb",
      "name": "Chan Yui Him Queston",
      "organisation": "Hour of Code",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212076",
      "creatorID": "6046c94862fbb2572f5dcdec",
      "name": "Wong Lap Keung",
      "organisation": "Hour of Code",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212077",
      "creatorID": "6046c94a62fbb2572f5dcded",
      "name": "Cheung Raisie",
      "organisation": "Hour of Code",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212101",
      "creatorID": "6048547507e07900c8881d1c",
      "name": "Choi Hoi To",
      "organisation": "Hour of Code",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212102",
      "creatorID": "60485a64ee65740052ead571",
      "name": "Mukhtar Rana Sher Ul",
      "organisation": "Hour of Code",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212103",
      "creatorID": "60485aac888da9005e401c11",
      "name": "Dante Grimbal Bermeo Kenji",
      "organisation": "Hour of Code",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212105",
      "creatorID": "60485af107e07900c88827fd",
      "name": "S Jenking",
      "organisation": "Hour of Code",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212078",
      "creatorID": "6046c94b62fbb2572f5dcdee",
      "name": "So Ethan Pak Chung",
      "organisation": "STEM Work",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212079",
      "creatorID": "6046c94d62fbb2572f5dcdef",
      "name": "Yu Chun Ting Henry",
      "organisation": "STEM Work",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212080",
      "creatorID": "6046c94f62fbb2572f5dcdf0",
      "name": "Teo Jun Hao Marcus",
      "organisation": "STEM Work",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212081",
      "creatorID": "6046c95062fbb2572f5dcdf1",
      "name": "Chan Tsz Kay Clara",
      "organisation": "STEM Work",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212082",
      "creatorID": "6046c95262fbb2572f5dcdf2",
      "name": "Yeung Chung Hei Eddison",
      "organisation": "STEM Work",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212083",
      "creatorID": "6046c95462fbb2572f5dcdf3",
      "name": "Cheung Yan Yin Emmet",
      "organisation": "STEM Work",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212084",
      "creatorID": "6046c95562fbb2572f5dcdf4",
      "name": "Chan Ho Ian",
      "organisation": "STEM Work",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212085",
      "creatorID": "6046c95762fbb2572f5dcdf5",
      "name": "Leung Jin Yu Rex",
      "organisation": "STEM Work",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212086",
      "creatorID": "6046c95962fbb2572f5dcdf6",
      "name": "Cheung Yat Yee Ultan",
      "organisation": "STEM Work",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212087",
      "creatorID": "6046c95b62fbb2572f5dcdf7",
      "name": "Shek Nok Sun",
      "organisation": "STEM Work",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212088",
      "creatorID": "6046c95c62fbb2572f5dcdf8",
      "name": "Ieong I Kei",
      "organisation": "Unicorn Coding Academy",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212089",
      "creatorID": "6046c95e62fbb2572f5dcdf9",
      "name": "Chui Teng Hou",
      "organisation": "Unicorn Coding Academy",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212090",
      "creatorID": "6046c96062fbb2572f5dcdfa",
      "name": "Leung Wun Hei",
      "organisation": "Unicorn Coding Academy",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212091",
      "creatorID": "6046c96162fbb2572f5dcdfb",
      "name": "Lei Pui Teng",
      "organisation": "Unicorn Coding Academy",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212092",
      "creatorID": "6046c96362fbb2572f5dcdfc",
      "name": "Ho Teng Lok",
      "organisation": "Unicorn Coding Academy",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212093",
      "creatorID": "6046c96562fbb2572f5dcdfd",
      "name": "Florentinus Sanchez",
      "organisation": "Unicorn Coding Academy",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212094",
      "creatorID": "6046c96662fbb2572f5dcdfe",
      "name": "Ho Hei U",
      "organisation": "Unicorn Coding Academy",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212095",
      "creatorID": "6046c96862fbb2572f5dcdff",
      "name": "Li",
      "organisation": "Unicorn Coding Academy",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212096",
      "creatorID": "6046c96a62fbb2572f5dce00",
      "name": "Ho Pak In",
      "organisation": "Unicorn Coding Academy",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212097",
      "creatorID": "6046c96b62fbb2572f5dce01",
      "name": "Ho Hei Wai",
      "organisation": "Unicorn Coding Academy",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212106",
      "creatorID": "604ffea5ed04d8a13f6c516b",
      "name": "Chan Hin In",
      "organisation": "Macau Science and Technology Innovation Education Association",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212107",
      "creatorID": "604ffea7ed04d8a13f6c516c",
      "name": "Chan Kuan Ieong",
      "organisation": "Macau Science and Technology Innovation Education Association",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212108",
      "creatorID": "604ffea8ed04d8a13f6c516d",
      "name": "Kuan Su Meng",
      "organisation": "Macau Science and Technology Innovation Education Association",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212109",
      "creatorID": "604ffeaaed04d8a13f6c516e",
      "name": "Lam Pok Hong",
      "organisation": "Macau Science and Technology Innovation Education Association",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212110",
      "creatorID": "604ffeabed04d8a13f6c516f",
      "name": "Liang Jia Hao",
      "organisation": "Macau Science and Technology Innovation Education Association",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212111",
      "creatorID": "604ffeaded04d8a13f6c5170",
      "name": "Lao Chit Bryan",
      "organisation": "Macau Science and Technology Innovation Education Association",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212112",
      "creatorID": "604ffeaeed04d8a13f6c5171",
      "name": "Mak Ieng Fong",
      "organisation": "Macau Science and Technology Innovation Education Association",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212113",
      "creatorID": "604ffeafed04d8a13f6c5172",
      "name": "Wong Hou Cheng",
      "organisation": "Macau Science and Technology Innovation Education Association",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212114",
      "creatorID": "604ffeb1ed04d8a13f6c5173",
      "name": "Sou Lok Io",
      "organisation": "Macau Science and Technology Innovation Education Association",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212115",
      "creatorID": "604ffeb2ed04d8a13f6c5174",
      "name": "Lei Weng Chon",
      "organisation": "Macau Science and Technology Innovation Education Association",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212116",
      "creatorID": "604ffeb4ed04d8a13f6c5175",
      "name": "Li Cheng Lok",
      "organisation": "Macau Science and Technology Innovation Education Association",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212117",
      "creatorID": "604ffeb5ed04d8a13f6c5176",
      "name": "Wong Ching Hin",
      "organisation": "Macau Science and Technology Innovation Education Association",
      "division": "OP"
    },
    {
      "codecomabtName": "ICE20212118",
      "creatorID": "60500519681d00020ab6b8f6",
      "name": "Lou Pak Cheng",
      "organisation": "Macau Science and Technology Innovation Education Association",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212119",
      "creatorID": "605020a4ec35fe019c139405",
      "name": "Ip Aaron",
      "organisation": "INSPIRE Education",
      "division": "OS"
    },
    {
      "codecomabtName": "ICE20212120",
      "creatorID": "6050215ec8353d0216436169",
      "name": "Leung Josh Bennett",
      "organisation": "INSPIRE Education",
      "division": "OS"
    }
  ];


  data.map((d) => {
    let student = schoolDate.filter(
      (x) => x.creatorID === d.creator
    )[0];

    if (student) {
      if (student.division == "SP") {
        pRankings.push({
          name: student.name,
          organisation: student.organisation,
          score: Math.round(d.leagues[1].stats.totalScore * 100),
          division: student.division,
        });
      } else if (student.division == "SS") {
        sRankings.push({
          name: student.name,
          organisation: student.organisation,
          score: Math.round(d.leagues[1].stats.totalScore * 100),
          division: student.division,
        });
      } else if (student.division == "OS") {
        soRankings.push({
          name: student.name,
          organisation: student.organisation,
          score: Math.round(d.leagues[1].stats.totalScore * 100),
          division: student.division,
        });
      } else if (student.division == "OP") {
        poRankings.push({
          name: student.name,
          organisation: student.organisation,
          score: Math.round(d.leagues[1].stats.totalScore * 100),
          division: student.division,
        });
      }
    }
  });

  return { props: { pRankings, sRankings, poRankings, soRankings } };
}


/**
 * @description
 * Returns a function which will sort an
 * array of objects by the given key.
 *
 * @param  {String}  key
 * @param  {Boolean} reverse
 * @return {Function}
 */
 const sortBy = (key, reverse) => {

  // Move smaller items towards the front
  // or back of the array depending on if
  // we want to sort the array in reverse
  // order or not.
  const moveSmaller = reverse ? 1 : -1;

  // Move larger items towards the front
  // or back of the array depending on if
  // we want to sort the array in reverse
  // order or not.
  const moveLarger = reverse ? -1 : 1;

  /**
   * @param  {*} a
   * @param  {*} b
   * @return {Number}
   */
  return (a, b) => {
    if (a[key] > b[key]) {
      return moveSmaller;
    }
    if (a[key] < b[key]) {
      return moveLarger;
    }
    return 0;
  };
};