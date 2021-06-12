import { Feature } from "ol";
import Circle from "ol/geom/Circle";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { useAppSelector } from "../hooks";
import MapWrapper from '../Map/MapWrapper'

const SeekerDiv = styled.div`
    display:flex;
    flex: 1;
    flex-direction: column;
`

export const Seeker = () => {
    const [futures, setFutures] = useState<Feature[]>([]);
    const game = useAppSelector((state) => state.game);
    useEffect(() => {
        const circle = new Feature({
          geometry: new Circle(
            game.position,
            game.fullZoneRadius
          ),
        });
        setFutures([circle]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    return <SeekerDiv><MapWrapper features={futures}></MapWrapper></SeekerDiv>
}
