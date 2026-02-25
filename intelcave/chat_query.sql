WITH base_tables AS (
    SELECT c.oid, c.relname, n.nspname
    FROM pg_class c
    JOIN pg_namespace n ON c.relnamespace = n.oid
    WHERE c.relkind IN ('r', 'p')
      AND n.nspname = 'public'
      AND NOT EXISTS (
          SELECT 1
          FROM pg_inherits i
          WHERE i.inhrelid = c.oid
      )
)
SELECT 
    bt.nspname AS schema_name,
    bt.relname AS table_name,
    a.attname AS column_name,
    pg_catalog.format_type(a.atttypid, a.atttypmod) AS data_type,
    CASE 
        WHEN a.attnotnull THEN 'NOT NULL'
        ELSE 'NULL'
    END AS nullable,
    CASE 
        WHEN p.contype = 'p' THEN 'PRIMARY KEY'
        WHEN p.contype = 'u' THEN 'UNIQUE'
        WHEN p.contype = 'f' THEN 'FOREIGN KEY'
        ELSE NULL
    END AS constraint_type,
    CASE 
        WHEN p.contype = 'f' THEN (SELECT nspname || '.' || relname
                                   FROM pg_class cc
                                   JOIN pg_namespace nn ON cc.relnamespace = nn.oid
                                   WHERE cc.oid = p.confrelid)
        ELSE NULL
    END AS foreign_table,
    i.indexname AS index_name
FROM 
    base_tables bt
JOIN 
    pg_catalog.pg_attribute a ON a.attrelid = bt.oid
LEFT JOIN 
    pg_catalog.pg_constraint p ON p.conrelid = bt.oid AND a.attnum = ANY(p.conkey)
LEFT JOIN 
    pg_catalog.pg_index pi ON bt.oid = pi.indrelid AND a.attnum = ANY(pi.indkey)
LEFT JOIN 
    pg_catalog.pg_class ic ON pi.indexrelid = ic.oid
LEFT JOIN 
    pg_catalog.pg_namespace in_ns ON ic.relnamespace = in_ns.oid
LEFT JOIN
    pg_indexes i ON bt.relname = i.tablename 
                AND bt.nspname = i.schemaname 
                AND ic.relname = i.indexname
WHERE 
    a.attnum > 0
    AND NOT a.attisdropped
ORDER BY 
    bt.nspname, bt.relname, a.attnum;