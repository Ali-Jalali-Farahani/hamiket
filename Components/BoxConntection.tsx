"use client"
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

type itemsType = {
    name: string,
    sub?: itemsType[]
}

export default function BoxConnection({ items, rerender, setRerender, path = [], setContextMenu, setSelectedPath,setOpen }: { items: itemsType, rerender: number, setRerender: Dispatch<SetStateAction<number>>, path: number[], setContextMenu: Dispatch<SetStateAction<{ mouseX: number; mouseY: number; } | null>>, setSelectedPath: Dispatch<SetStateAction<number[] | undefined>>,setOpen:React.Dispatch<React.SetStateAction<boolean>> }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sourceRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [paths, setPaths] = useState<{ d: string; start: { x: number; y: number }; end: { x: number; y: number } }[]>([]);

    const [hide, setHide] = useState<boolean>(false)

    const InfoBox = styled(Box)(({ theme }) => ({
        backgroundColor: "#C98585",
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '8px',
        minWidth: '130px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        zIndex: 2,
        position: 'relative',
    }));

    useEffect(() => {
        const calc = () => {
            const container = containerRef.current;
            const source = sourceRef.current;
            if (!container || !source) return;

            const cRect = container.getBoundingClientRect();

            const sRect = source.getBoundingClientRect();
            const start = {
                x: sRect.left - cRect.left,
                y: sRect.top - cRect.top + sRect.height / 2,
            };

            const newPaths = itemRefs.current.map((el) => {
                if (!el) return null;
                const r = el.getBoundingClientRect();

                const end = {
                    x: r.right - cRect.left,
                    y: r.top - cRect.top + 24,
                };

                const d = `M ${start.x} ${start.y} L ${(start.x + end.x) / 2} ${start.y} L ${(start.x + end.x) / 2} ${end.y} L ${end.x} ${end.y}`;

                return { d, start, end };
            }).filter(Boolean) as any[];

            setPaths(newPaths);
        };

        calc();
        window.addEventListener('resize', calc);
        return () => window.removeEventListener('resize', calc);
    }, [hide, rerender, itemRefs]);

    function handleContextMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.preventDefault();
        setContextMenu({
            mouseX: e.clientX + 2,
            mouseY: e.clientY - 6,
        })
        console.log("mouseX:", e.clientX + 2,
            "mouseY:", e.clientY - 6,)
    }

    return (

        <div className='h-fit flex flex-row gap-12 relative' ref={containerRef}>
            <svg
                width={"100%"}
                height={"100%"}
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    pointerEvents: 'none',
                    overflow: 'visible',
                }}
            >
                <defs>
                    <marker
                        id="arrow"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="8"
                        markerHeight="8"
                        orient="auto-start-reverse"
                    >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#C98585" />
                    </marker>
                </defs>

                {paths.map((p, i) => (
                    <path
                        key={i}
                        d={p.d}
                        stroke="#C98585"
                        strokeWidth={2}
                        fill="none"
                        markerEnd="url(#arrow)"
                    />
                ))}
            </svg>

            <div className='h-fit' ref={sourceRef} onContextMenu={(e) => { setSelectedPath(path); handleContextMenu(e) }} onClick={() => { setHide(!hide);if(hide){itemRefs.current=[]}; setRerender((render) => render + 1); setSelectedPath(path); console.log(itemRefs) }}>
                <InfoBox>
                    <Typography variant="body1" component="span">{items.name}</Typography>
                </InfoBox>
            </div>

            <div className='flex flex-col gap-4'>
                {items.sub && !hide && (
                    <>
                        {
                            items.sub.map((selectedItems, index) => (
                                <div key={index} ref={(el) => { itemRefs.current[index] = el; }}>
                                    <BoxConnection items={selectedItems} rerender={rerender} setRerender={setRerender} path={[...path, index]} setContextMenu={setContextMenu} setSelectedPath={setSelectedPath} setOpen={setOpen}/>
                                </div>

                            ))
                        }
                    </>
                )}

                <div ref={(el) => { itemRefs.current.push(el) }}>
                    <div className='h-fit flex flex-row gap-12 relative' ref={containerRef}>
                        <div className='h-fit cursor-pointer' onContextMenu={(e) => { setSelectedPath(path); handleContextMenu(e) }} onClick={() => {setSelectedPath(path);setOpen(true)}}>
                            <InfoBox style={{ backgroundColor: "white", color: "black" }}>
                                <Typography variant="body1" component="span">افزودن</Typography>
                            </InfoBox>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}