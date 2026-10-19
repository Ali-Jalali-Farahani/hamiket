"use client"
import BoxConnection from '@/Components/BoxConntection';
import ContextMenu from '@/Components/ContextMenu';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CustomModal from '@/Components/Modal';

type itemsType = {
  name: string,
  sub?: itemsType[]
}

export default function Home() {

  //selected item path
  const [selectedPath, setSelectedPath] = useState<number[]>()

  //for rerender dom (specially for svg  rerender-paths change)
  const [rerender, setRerender] = useState<number>(0)

  //items
  const [allItems, setAllItems] = useState<itemsType>(
    {
      name: "حساب های اصلی",
      sub: [
        {
          name: "دارایی های جاری", sub: [
            {
              name: "وجه نقد", sub: [
                { name: "تن خواه", sub: [] },
                { name: "بانک", sub: [] }
              ]
            },
            {
              name: "حساب های دریافتنی", sub: [
                { name: "حساب های دریافتنی حامی کت", sub: [] }
              ]
            }
          ]
        },
        { name: "دارایی های غیر جاری", sub: [] },
        {
          name: "بدهی های جاری", sub: [
            {
              name: "حساب های پرداختنی تجاری", sub: [
                { name: "کیف پول پرداختنی خریدار", sub: [] },
                { name: "حساب های پرداختنی فروشگاه", sub: [] },
                { name: "حساب های پرداختنی فروشنده", sub: [] },
                { name: "حساب های پرداختنی پیک", sub: [] }
              ]
            },
            {
              name: "حساب های پرداختنی غیر تجاری", sub: [
                { name: "مالیات چرداختنی", sub: [] },
                { name: "بیمه پرداختنی", sub: [] },
                { name: "ارزش افزوده پرداختنی", sub: [] },
                { name: "تامین کننده هزینه", sub: [] },
                { name: "حقوق پرداختنی", sub: [] },
              ]
            }
          ]
        },
        { name: "بدهی های غیر جاری", sub: [] },
        { name: "حقوق صاحبان سهام", sub: [] },
      ]
    }
  )

  //item selected
  const [itemSelected, setItemSelected] = useState<{ method: "copy" | "cut", item: itemsType } | null>()

  //context menu location
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  //open modal
  const [open, setOpen] = React.useState(false);

  function copy() {
    let current = allItems;
    if (selectedPath) {
      for (const index of selectedPath) {
        if (!current?.sub || index < 0 || index >= current.sub.length) {
          return undefined;
        }
        current = current.sub[index];
      }

      setItemSelected({ method: "copy", item: current })
    }
  }

  function removeItem(root: itemsType, path: number[]): itemsType {
    if (path.length === 0) return root;

    const [index, ...rest] = path;

    const newSub = root.sub ? [...root.sub] : [];
    if (index < 0 || index >= newSub.length) return root;

    if (rest.length === 0) {
      let items = newSub.splice(index, 1);
      setItemSelected({ method: "cut", item: items[0] })
    } else {
      newSub[index] = removeItem(newSub[index], rest);
    }

    return { ...root, sub: newSub };
  }

  function cut() {
    if (selectedPath)
      setAllItems(prev => removeItem(prev, selectedPath));
    setRerender((render) => render + 1)
  }


  function addItem(root: itemsType, path: number[]): itemsType {
    if (path.length === 0) return root;

    const [index, ...rest] = path;

    const newSub = root.sub ? [...root.sub] : [];
    if (index < 0 || index >= newSub.length) {
      return root;
    }

    if (rest.length === 0) {
      if (itemSelected?.item) {
        const target = newSub[index];
        newSub[index] = {
          ...target,
          sub: [...(target.sub ?? []), itemSelected.item],
        };
      }
    } else {
      newSub[index] = addItem(newSub[index], rest);
    }

    return { ...root, sub: newSub };
  }

  function paste() {
    if (selectedPath)
      setAllItems(prev => addItem(prev, selectedPath));
    setRerender((render) => render + 1)
  }

  function addNew(root: itemsType, path: number[], name: string): itemsType {
    if (path.length === 0) return root;

    const [index, ...rest] = path;

    const newSub = root.sub ? [...root.sub] : [];
    if (index < 0 || index >= newSub.length) {
      return root;
    }

    if (rest.length === 0) {
      const target = newSub[index];
      newSub[index] = {
        ...target,
        sub: [...(target.sub ?? []), { name: name, sub: [] }],
      };
    } else {
      newSub[index] = addNew(newSub[index], rest, name);
    }

    return { ...root, sub: newSub };
  }

  return (
    <div
      dir='rtl'
      className="w-full h-full flex flex-row p-4 gap-12 relative"
    >
      <ContextMenu contextMenu={contextMenu} setContextMenu={setContextMenu} cut={cut} copy={copy} paste={paste} />
      <BoxConnection items={allItems} rerender={rerender} setRerender={setRerender} path={[]} setContextMenu={setContextMenu} setSelectedPath={setSelectedPath} setOpen={setOpen} />

      <CustomModal
        open={open}
        setOpen={setOpen}
        onKeyDown={(e, name) => {
          if (e.key === 'Enter') {
            if (name.length != 0 && selectedPath) {
              setAllItems(prev => addNew(prev, selectedPath, name))
              setRerender((rerender) => rerender + 1)
              setOpen(false)
            }
          }
        }}
        onClick={
          (name: string) => {
            if (name.length != 0 && selectedPath) {
              setAllItems(prev => addNew(prev, selectedPath, name))
              setOpen(false)
            }
            setRerender((render) => render + 1)
          }
        }
      />
    </div>
  );
}