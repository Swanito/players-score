import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@northlight/ui";

export interface RankingPosition {
    name: string;
    maxScore: number;
    allScores: number[];
    isExpanded: boolean;
}

interface RankingTableProps {
    ranking: RankingPosition[];
}

export function RankingTable({ ranking }: RankingTableProps) {
    const [expandedRows, setExpandedRows] = useState<number[]>([]);

    const handleRowClick = (index: number) => {
        setExpandedRows(prev =>
            prev.includes(index) ? prev.filter(row => row !== index) : [...prev, index]
        );
    };

    return (
        <Table variant="rounded">
            <Thead>
                <Tr>
                    <Th fontWeight="bold">Player</Th>
                    <Th fontWeight="bold">Max score</Th>
                </Tr>
            </Thead>
            <Tbody>
                {ranking.map((player, index) => (
                    <React.Fragment key={index}>
                        <Tr onClick={() => handleRowClick(index)}>
                            <Td>{player.name}</Td>
                            <Td>{player.maxScore}</Td>
                        </Tr>
                        {expandedRows.includes(index) && (
                            <ExpandedRankingTableRow scores={player.allScores} />
                        )}
                    </React.Fragment>
                ))}
            </Tbody>
        </Table>
    );
}

interface ExpandedRankingTableRowProps {
    scores: number[];
}

function ExpandedRankingTableRow({ scores }: ExpandedRankingTableRowProps) {
    return (
        <>
            {scores.map((score, index) => (
                <Tr key={index}>
                    <Td colSpan={2} textAlign={"right"}>{score}</Td>
                </Tr>
            ))}
        </>
    );
}
