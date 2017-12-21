<div class="clearfix center" style="background-color: #000;">
	<ul class="clearfix float-ul supply-ul">
		@foreach($supplyrows as $row)
			<li class="{{ $PAGE_CODE==$row[1]?'active':'' }}"><a href="{{ $row[1] }}">{{ $row[0] }}</a></li>
		@endforeach
	</ul>
</div>