import React, { useState, useEffect } from 'react'
import { Container, Grid, Image, Input } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Topbar() {
    return (
        <div className="top-bar">
            
            <Container>

                <Grid className="top-bar">

                    <Grid.Column width={8} className="top_bar_left">

                        <Logo />

                    </Grid.Column>

                    <Grid.Column width={8} className="top_bar_right">

                        <Search />

                    </Grid.Column>

                </Grid>

            </Container>

        </div>
    )
}

function Logo() {

    return (
        <Link href="/">
            <a>
                <Image src="/logo.png" alt="Gaming" />
            </a>
        </Link>
    )

}

function Search() {

    const [searchStr, setSearchStr] = useState("");
    const [load, setLoad] = useState(false);
    const router = useRouter();

    useEffect(() => {
        
        if(load) {
            router.push(`/search?q=${searchStr}`);
        }
        setLoad(true);

    }, [searchStr]);

    return <Input id="search-game" 
            icon={{ name: "search", color: "orange", opacity: 1 }} 
            value={router.query.q} 
            onChange={(_, data) => setSearchStr(data.value) }  />

}
